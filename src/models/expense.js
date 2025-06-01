import database from "../config/db-connection.js";
import { ObjectId } from "mongodb";
import {
  getAmountByPercentage,
  prepareStartAndEndDate
} from "../utils/helpers.js";
import { getAppConfigs } from "../utils/get-app-configs.js";

/**
 * Expense model - Handles database operations for expenses
 */
class Expense {
  static get collection() {
    if (!this._collection) {
      const clusterName = process.env.EXPENSE_DATA_CLUSTER;
      this._collection = database.getDb().collection(clusterName);
    }
    return this._collection;
  }

  /**
   * Find recent expenses
   * @returns {Promise<Array>} - Array of expenses
   */
  static async getAllExpenses() {
    try {
      const expenses = await this.collection
        .find({})
        .sort({ date: -1 })
        .toArray();
      return expenses;
    } catch (error) {
      throw new Error(`Error finding recent expenses: ${error.message}`);
    }
  }

  /**
   * Find an expense by ID
   * @param {string} id - Expense ID
   * @returns {Promise<Object|null>} - Expense object or null if not found
   */
  static async findById(id) {
    try {
      const expense = await this.collection.findOne({ _id: new ObjectId(id) });
      return expense;
    } catch (error) {
      throw new Error(`Error finding expense by ID: ${error.message}`);
    }
  }

  /**
   * Create a new expense
   * @param {Object} expenseData - Expense data (description, amount, type, date)
   * @returns {Promise<Object>} - Created expense object
   */
  static async create(expenseData) {
    try {
      const { expenseType, description, amount, date } = expenseData;

      const newExpense = {
        description,
        amount: parseFloat(amount),
        type: expenseType,
        date: new Date(date),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await this.collection.insertOne(newExpense);
      return await this.findById(result.insertedId);
    } catch (error) {
      throw new Error(`Error creating expense: ${error.message}`);
    }
  }

  /**
   * Update an expense
   * @param {string} id - Expense ID
   * @param {Object} expenseData - Expense data to update
   * @returns {Promise<Object|null>} - Updated expense object or null if not found
   */
  static async update(id, expenseData) {
    try {
      const { description, amount, expenseType, date } = expenseData;

      const updateData = { updatedAt: new Date() };
      if (description !== undefined) updateData.description = description;
      if (amount !== undefined) updateData.amount = parseFloat(amount);
      if (expenseType !== undefined) updateData.type = type;
      if (date !== undefined) updateData.date = new Date(date);

      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return null;
      }

      return await this.findById(id);
    } catch (error) {
      throw new Error(`Error updating expense: ${error.message}`);
    }
  }

  /**
   * Delete an expense
   * @param {string} id - Expense ID
   * @returns {Promise<boolean>} - True if deleted, false otherwise
   */
  static async delete(id) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error(`Error deleting expense: ${error.message}`);
    }
  }

  /**
   * Find expenses by month and year
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @returns {Promise<Array>} - Array of expenses for the month
   */
  static async processDashboardData(year, month) {
    try {
      const { startDate, endDate } = prepareStartAndEndDate(year, month);

      const dashBoardData = {};

      //get monthly expenses
      const expenses = await this.collection
        .find({
          date: { $gte: startDate, $lte: endDate }
        })
        .sort({ date: -1 })
        .toArray();

      dashBoardData["dashBoardData"] = expenses;

      //get monthly total expense amount
      const monthlyTotalExpense = await this.getMonthlyTotalExpense(
        year,
        month
      );

      dashBoardData["monthlyTotalExpense"] = monthlyTotalExpense;

      // get if monthly total expense amount has exceed the limit
      const hasExceedExpenseLimit = await this.isMaxAmountExceeded(year, month);
      dashBoardData["hasExceedExpenseLimit"] = hasExceedExpenseLimit;

      return dashBoardData;
    } catch (error) {
      throw new Error(`Error finding expenses by month: ${error.message}`);
    }
  }

  /**
   * Get monthly total expenses
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @returns {Promise<number>} - Total amount for the month
   */
  static async getMonthlyTotalExpense(year, month) {
    try {
      const { startDate, endDate } = prepareStartAndEndDate(year, month);

      const result = await this.collection
        .aggregate([
          {
            $match: {
              date: { $gte: startDate, $lte: endDate }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" }
            }
          }
        ])
        .toArray();

      return result.length > 0 ? result[0].total : 0;
    } catch (error) {
      throw new Error(`Error calculating monthly total: ${error.message}`);
    }
  }

  /**
   * Check if monthly total amount has exceeded the max expense amount
   * @returns {boolean} - true if monthly total expenses has exceeded the max expense amount or then false
   */
  static async isMaxAmountExceeded(year, month) {
    try {
      const appConfigs = await getAppConfigs();

      const maxExpenseLimit = appConfigs?.maxExpenseLimit;
      const maxExpensePercentage = appConfigs?.maxExpensePercentage;

      if (!maxExpenseLimit || !maxExpensePercentage)
        throw new Error(`Error finding app configs`);

      //get monthly total expenses
      const monthlyTotal = await this.getMonthlyTotalExpense(year, month);

      //get monthly expense
      const maxExpenseAmount = getAmountByPercentage(
        maxExpenseLimit,
        maxExpensePercentage
      );

      return monthlyTotal > maxExpenseAmount ? true : false;
    } catch (error) {
      throw new Error(
        `Error finding max expenses has exceeded: ${error.message}`
      );
    }
  }
}

export default Expense;
