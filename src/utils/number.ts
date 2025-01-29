import type Decimal from "break_eternity.js";

export const formatNumber = (num: Decimal): string => {
  return num.round().toString();
};