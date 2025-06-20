/**
 * Validates expense input data
 * @param {Object} expenseData - expense data to validate
 * @returns {Object} - Validation result with error or validated value
 */

export const validateExpenseInput = (expenseData) => {
  const errors = [];
  const validatedData = {};

  // Validate expense type
  if (!expenseData?.type) {
    errors.push("Expense type is required");
  } else {
    validatedData.expenseType = expenseData?.type;
  }

  // Validate expense description
  if (!expenseData?.description) {
    errors.push("Expense description is required");
  } else {
    validatedData.description = expenseData?.description;
  }

  // Validate expense amount
  if (!expenseData?.amount) {
    errors.push("Expense amount is required");
  } else if (isNaN(expenseData?.amount)) {
    errors.push("Expense amount must be a number");
  } else {
    validatedData.amount = expenseData?.amount;
  }

  // Validate expense date
  if (!expenseData?.date) {
    errors.push("Expense date is required");
  } else {
    validatedData.date = expenseData?.date;
  }

  // Return validation result
  if (errors.length > 0) {
    return {
      error: new Error(errors.join(". ")),
      value: null
    };
  }

  return {
    error: null,
    value: validatedData
  };
};
