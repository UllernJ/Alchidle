import Decimal from "break_eternity.js";

export const formatNumber = (num: Decimal): string => {
  if (num.gte(new Decimal(1e15))) {
    return num.toExponential(2).replace("+", "");
  }

  const units = ["", "K", "M", "B", "T"];
  let unitIndex = 0;
  let value = num;

  while (value.gte(new Decimal(1000)) && unitIndex < units.length - 1) {
    value = value.div(new Decimal(1000));
    unitIndex++;
  }

  let formattedValue = value.toFixed(1).replace(/\.00$/, "");
  if (value.lt(new Decimal(1000))) {
    if (formattedValue.includes(".")) {
      formattedValue = formattedValue.replace(/\.0+$/, "");
    }
  }

  return `${formattedValue}${units[unitIndex]}`;
};
