export const formatCurrency = (n) =>
  `Rs. ${parseFloat(n).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    maximumFractionDigits: 0,
    useGrouping: true,
  })}`;
