import express from "express";

import ExpenseController from "../controllers/expense-controller.js";

const router = express.Router();

/**
 * @route   GET /api/expenses
 * @desc    Get expenses
 */
router.get("/", ExpenseController.getExpenses);

/**
 * @route   POST /api/expenses
 * @desc    Create a new expense
 */
router.post("/", ExpenseController.createExpense);

/**
 * @route   PUT /api/expenses/:id
 * @desc    Update an expense
 */
router.patch("/:id", ExpenseController.updateExpense);

/**
 * @route   DELETE /api/expenses/:id
 * @desc    Delete an expense
 */
router.delete("/:id", ExpenseController.deleteExpense);

/**
 * @route   GET /api/expenses/dashboard
 * @desc    Get expenses
 */
router.get("/dashboard", ExpenseController.getDashboardData);

export default router;
