// check if given amount exceed a given percentage
export const getAmountByPercentage = (amount, desiredPercentage) => {
  if (!amount || !desiredPercentage) return null;

  const amountByPercentage = amount * (desiredPercentage / 100);
  return amountByPercentage;
};
// find and return start date and end date of a month by given month and year
export const prepareStartAndEndDate = (year, month) => {
  if (!year || !month) return null;

  const startDate = new Date(year, month, 1);

  const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

  return {
    startDate,
    endDate
  };
};
