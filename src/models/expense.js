import database from "../config/db-connection.js";
import { ObjectId } from "mongodb";

/**
 * Expense model - Handles database operations for expenses
 */
class Expense {
  static get collection() {
    return database.getDb().collection("expenses");
  }

  /**
   * Find recent expenses
   * @returns {Promise<Array>} - Array of expenses
   */
  static async findRecent() {
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
      const { type, description, amount, date } = expenseData;
      const newExpense = {
        description,
        amount: parseFloat(amount),
        type,
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
      const { description, amount, type, date } = expenseData;

      const updateData = { updatedAt: new Date() };
      if (description !== undefined) updateData.description = description;
      if (amount !== undefined) updateData.amount = parseFloat(amount);
      if (type !== undefined) updateData.type = type;
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
  static async findByMonth(month, year) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      const expenses = await this.collection
        .find({
          date: { $gte: startDate, $lte: endDate }
        })
        .sort({ date: -1 })
        .toArray();

      return expenses;
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
  static async getMonthlyTotal(month, year) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

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
}

export default Expense;
