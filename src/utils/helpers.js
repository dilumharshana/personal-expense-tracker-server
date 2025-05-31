// check if given amount exceed a given percentage
export const getAmountByPercentage = (amount, desiredPercentage) => {
  const amountByPercentage = amount * (desiredPercentage / 100);
  return amountByPercentage;
};
