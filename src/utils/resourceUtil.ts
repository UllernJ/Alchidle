import { RESOURCE } from "../types";

export const getRandomResource = (): RESOURCE => {
  const resources = Object.values(RESOURCE);
  return resources[Math.floor(Math.random() * resources.length)];
};
