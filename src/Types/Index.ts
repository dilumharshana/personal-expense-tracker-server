// interface for master data
export interface MasterData {
  _id: string;
  title: string;
}

// interface of an expense item
export interface Expense {
  _id?: string;
  type: string;
  description: string;
  amount: number;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

// interface for expense form input data
export interface ExpenseFormData {
  type: string;
  description: string;
  amount: number | string;
  date: string;
}

// interface for dashboard response data
export interface DashboardData {
  dashBoardData: Expense[];
  monthlyTotalExpense: number;
  hasExceedExpenseLimit: boolean;
}

// generic interface for API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// interface for filtering expense data
export interface ExpenseFilters {
  type?: string;
  description?: string;
  dateFrom?: string;
  dateTo?: string;
}
