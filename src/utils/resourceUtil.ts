import { RESOURCE } from "../types";

export const getRandomResource = (): RESOURCE => {
  const resources = Object.values(RESOURCE);
  return resources[Math.floor(Math.random() * resources.length)];
};

export const getResourceDropMessage = (
  resource: RESOURCE,
  amount: number
): string => {
  switch (resource) {
    case RESOURCE.MONEY:
      return `You collected ${amount} gold from your foe!`;
    case RESOURCE.MINING:
      return `You collected ${amount} mining resources from your foe!`;
    case RESOURCE.ALCHEMY:
      return `You collected ${amount} alchemy resources from your foe!`;
    default:
      return `You collected some interesting science from your foe, somehow earning you ${amount} science points.`;
  }
};
