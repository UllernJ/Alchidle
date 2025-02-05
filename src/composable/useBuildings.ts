import Decimal from "break_eternity.js";
import { buildings, getDefaultCostsByBuildingName } from "../data/buildings";

export const useBuildings = () => {

  const resetBuildings = () => {
    buildings.value.forEach((building) => {
      building.quantity = new Decimal(0);
      building.cost = getDefaultCostsByBuildingName(building.name);
    });
  };

  return { buildings, resetBuildings };
};
