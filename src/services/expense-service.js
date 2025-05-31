import Expense from "../models/expense.js";
import { validateExpenseInput } from "../utils/validators.js";

/**
 * Expense Service - Business logic handler for expense operations
 */
class ExpenseService {
  /**
   * Get expenses
   * @returns {Promise<Array>} - Array of expenses
   */
  static async getExpenses() {
    return await Expense.getAllExpenses();
  }

  /**
   * Get an expense by ID
   * @param {string} id - Expense ID
   * @returns {Promise<Object>} - Expense object
   * @throws {Error} - If expense not found
   */
  static async getExpenseById(id) {
    const expense = await Expense.findById(id);

    if (!expense) {
      const error = new Error("Expense not found");
      error.statusCode = 404;
      throw error;
    }

    return expense;
  }

  /**
   * Create a new expense
   * @param {Object} expenseData - Expense data
   * @returns {Promise<Object>} - Created expense
   * @throws {Error} - If validation fails
   */
  static async createExpense(expenseData) {
    const { error, value } = validateExpenseInput(expenseData);
    console.log(error);

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      return validationError;
    }

    return await Expense.create(value);
  }

  /**
   * Update an expense
   * @param {string} id - Expense ID
   * @param {Object} expenseData - Data to update
   * @returns {Promise<Object>} - Updated expense
   * @throws {Error} - If expense not found or validation fails
   */
  static async updateExpense(id, expenseData) {
    return await Expense.update(id, expenseData);
  }

  /**
   *check if monthly max expense limit has exceed
   * @returns {boolean} - true if monthly total expenses has exceeded the max expense amount or then false
   * @throws {Error} - If expense not found or validation fails
   */
  static async checkMaxAmountExceeded() {
    return await Expense.maxAmountExceeded();
  }

  /**
   * Delete an expense
   * @param {string} id - Expense ID
   * @returns {Promise<boolean>} - Whether deletion was successful
   * @throws {Error} - If expense not found
   */
  static async deleteExpense(id) {
    return await Expense.delete(id);
  }
}

export default ExpenseService;
