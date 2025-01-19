export const formatNumber = (num: number): string => {
  if (num >= 1e21) {
    return (num / 1e21).toFixed(1) + "Z";
  } else if (num >= 1e18) {
    return (num / 1e18).toFixed(1) + "E";
  } else if (num >= 1e15) {
    return (num / 1e15).toFixed(1) + "P";
  } else if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + "T";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return Math.round(num).toString();
  }
};