import { getBuildings } from "../data/buildings";

export const useBuildings = () => {
  const buildings = getBuildings();
  return { buildings };
};
