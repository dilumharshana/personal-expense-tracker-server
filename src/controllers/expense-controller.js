import ExpenseService from "../services/expense-service.js";

/**
 * Expense Controller - Handles expense operations
 */
class ExpenseController {
  /**
   * Get recent expenses
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  static async getExpenses(req, res, next) {
    try {
      const expenses = await ExpenseService.getExpenses();
      res.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new expense
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  static async createExpense(req, res, next) {
    try {
      const expense = await ExpenseService.createExpense(req.body);
      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update an expense
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  static async updateExpense(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: error.message });
      }

      const updatedExpense = await ExpenseService.updateExpense(id, req.body);
      res.status(200).json(updatedExpense);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete an expense
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  static async deleteExpense(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: error.message });
      }

      await ExpenseService.deleteExpense(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get dashboard data for expenses
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  static async getDashboardData(req, res, next) {
    try {
      const year = req.query.year;
      const month = req.query.month;

      const expenses = await ExpenseService.getDashboardData(year, month);
      res.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  }
}

export default ExpenseController;
