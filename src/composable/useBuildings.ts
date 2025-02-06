import { getBuildings } from "../data/buildings";

const buildings = getBuildings();

export const useBuildings = () => {

  const resetBuildings = () => {
      buildings.value = getBuildings().value;
  };

  return { buildings, resetBuildings };
};
