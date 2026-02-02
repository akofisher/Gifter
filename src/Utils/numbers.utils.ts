export const formatNumber = (num: number): string => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};
