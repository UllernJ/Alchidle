import { ref } from "vue";
import { RESOURCE } from "../types";
import { Resource } from "../models/Resource";
import { BigNumber } from "../models/BigNumber";

export const MONEY = ref<Resource>(new Resource(RESOURCE.MONEY));
export const MINING = ref<Resource>(new Resource(RESOURCE.MINING));
export const SCIENCE = ref<Resource>(new Resource(RESOURCE.SCIENCE));

export const useResource = () => {
  const addResource = (type: RESOURCE, amount: BigNumber) => {
    getResource(type).addAmount(amount);
  };

  const subtractResource = (type: RESOURCE, amount: BigNumber) => {
    getResource(type).deductAmount(amount);
  };

  const canAfford = (type: RESOURCE, amount: BigNumber) => {
    return getResource(type).canAfford(amount);
  };

  const getResource = (type: RESOURCE) => {
    switch (type) {
      case RESOURCE.MONEY:
        return MONEY.value;
      case RESOURCE.MINING:
        return MINING.value;
      case RESOURCE.SCIENCE:
        return SCIENCE.value;
    }
  }

  return {
    addResource,
    subtractResource,
    canAfford,
    getResource
  };
};
