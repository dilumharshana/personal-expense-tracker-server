// src/services/expenseService.ts
import { apiClient } from "../Utilis/ApiClient";
import { API_ENDPOINTS } from "../Configs/Api";
import type { Expense, ExpenseFormData, DashboardData } from "../Types/Index";

export const expenseService = {
  getExpenses: async (): Promise<Expense[]> => {
    return await apiClient.get<Expense[]>(API_ENDPOINTS.EXPENSES.BASE);
  },

  createExpense: async (expense: ExpenseFormData): Promise<Expense> => {
    return await apiClient.post<Expense>(API_ENDPOINTS.EXPENSES.BASE, expense);
  },

  updateExpense: async (
    id: string,
    expense: ExpenseFormData
  ): Promise<Expense> => {
    return await apiClient.patch<Expense>(
      `${API_ENDPOINTS.EXPENSES.BASE}/${id}`,
      expense
    );
  },

  deleteExpense: async (id: string): Promise<void> => {
    return await apiClient.delete<void>(`${API_ENDPOINTS.EXPENSES.BASE}/${id}`);
  },

  getDashboardData: async (
    month: number,
    year: number
  ): Promise<DashboardData> => {
    return await apiClient.get<DashboardData>(
      `${API_ENDPOINTS.EXPENSES.DASHBOARD}/?month=${month}&year=${year}`
    );
  }
};
