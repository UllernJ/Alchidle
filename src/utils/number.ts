import Decimal from "break_eternity.js";

export const formatNumber = (num: Decimal): string => {
  if (num.gte(new Decimal(1e15))) {
    return num.toExponential(2).replace("+", "");
  }

  const units = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
    "UDc",
    "DDc",
    "TDc",
    "QaDc",
    "QiDc",
    "SxDc",
    "SpDc",
    "ODc",
    "NDc",
    "Vi",
    "UVi",
    "DVi",
    "TVi",
    "QaVi",
    "QiVi",
    "SxVi",
    "SpVi",
    "OcVi",
    "NoVi",
    "Tg",
    "UTg",
    "DTg",
    "TTg",
    "QaTg",
    "QiTg",
    "SxTg",
    "SpTg",
    "OcTg",
    "NoTg",
    "Qd",
    "UQd",
    "DQd",
    "TQd",
    "QaQd",
    "QiQd",
    "SxQd",
    "SpQd",
    "OcQd",
    "NoQd",
    "Qq",
    "UQq",
    "DQq",
    "TQq",
    "QaQq",
    "QiQq",
    "SxQq",
    "SpQq",
    "OcQq",
    "NoQq",
    "Sg",
    "USg",
    "DSg",
    "TSg",
    "QaSg",
    "QiSg",
    "SxSg",
    "SpSg",
    "OcSg",
    "NoSg",
    "St",
    "USt",
    "DSt",
    "TSt",
    "QaSt",
    "QiSt",
    "SxSt",
    "SpSt",
    "OcSt",
    "NoSt",
    "Og",
    "UOg",
    "DOg",
    "TOg",
    "QaOg",
    "QiOg",
    "SxOg",
    "SpOg",
    "OcOg",
    "NoOg",
    "Nn",
    "UNn",
    "DNn",
    "TNn",
    "QaNn",
    "QiNn",
    "SxNn",
    "SpNn",
    "OcNn",
    "NoNn",
    "Ce",
  ];

  let unitIndex = 0;
  let value = num;

  while (value.gte(new Decimal(1000)) && unitIndex < units.length - 1) {
    value = value.div(new Decimal(1000));
    unitIndex++;
  }

  let formattedValue;
  if (unitIndex === 0) {
    formattedValue = value.toFixed(0);
  } else {
    formattedValue = value.toFixed(2).replace(/\.00$/, "");
  }

  return `${formattedValue}${units[unitIndex]}`;
};