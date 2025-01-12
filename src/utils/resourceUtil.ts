import {
  alchemyIcon,
  miningIcon,
  moneyIcon,
  scienceIcon,
} from "../icons/icons";
import { RESOURCE } from "../types";

export const getRandomResource = (): RESOURCE => {
  const resources = Object.values(RESOURCE);
  return resources[Math.floor(Math.random() * resources.length)];
};

export const getResourceDropMessage = (
  resource: RESOURCE,
  amount: number
): string => {
  if (amount === 0) {
    return "You didn't get anything from your foe.";
  }
  switch (resource) {
    case RESOURCE.MONEY:
      return `You collected ${amount} gold coins from your foe!`;
    case RESOURCE.MINING:
      return `You collected ${amount} mining resources from your foe!`;
    default:
      return `You collected some interesting books from your foe, somehow earning you ${amount} science points.`;
  }
};

export const getResourceIcon = (resource: RESOURCE | null): string => {
  switch (resource) {
    case RESOURCE.MONEY:
      return moneyIcon;
    case RESOURCE.MINING:
      return miningIcon;
    case RESOURCE.SCIENCE:
      return scienceIcon;
    default:
      return "";
  }
};
