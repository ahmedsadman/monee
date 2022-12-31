export const formatMoneyAmount = (amount: number | undefined) => {
  return amount ? Math.ceil(amount).toLocaleString("en-GB") : "0";
};
