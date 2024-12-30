import { ref } from "vue";
import { RESOURCE } from "../types";

const resources = {
  [RESOURCE.MONEY]: ref<number>(0),
  [`max${RESOURCE.MONEY}`]: ref<number>(200),
  [RESOURCE.WOODCUTTING]: ref<number>(0),
  [`max${RESOURCE.WOODCUTTING}`]: ref<number>(200),
  [RESOURCE.MINING]: ref<number>(0),
  [`max${RESOURCE.MINING}`]: ref<number>(200),
  [RESOURCE.FARMING]: ref<number>(0),
  [`max${RESOURCE.FARMING}`]: ref<number>(200),
  [RESOURCE.SCIENCE]: ref<number>(0),
  [`max${RESOURCE.SCIENCE}`]: ref<number>(200),
  [RESOURCE.ALCHEMY]: ref<number>(0),
  [`max${RESOURCE.ALCHEMY}`]: ref<number>(200),
};

export const useResource = () => {
  const addResource = (type: RESOURCE, amount: number) => {
    const resource = resources[type];
    const maxResource = resources[`max${type}` as keyof typeof resources];

    if (resource && maxResource) {
      resource.value = Math.min(resource.value + amount, maxResource.value);
    }
  };

  const subtractResource = (type: RESOURCE, amount: number) => {
    const resource = resources[type];
    if (resource) {
      resource.value = Math.max(resource.value - amount, 0);
    }
  };

  const upgradeStorage = (type: RESOURCE) => {
    const maxResource = resources[`max${type}` as keyof typeof resources];
    if (maxResource) {
      maxResource.value *= 2;
    }
  };

  return {
    resources,
    addResource,
    subtractResource,
    upgradeStorage,
  };
};
