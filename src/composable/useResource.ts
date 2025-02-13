import { ref } from "vue";
import { useMessage, MessageType } from "./useMessage";
import { RESOURCE } from "../types";
import Decimal from "break_eternity.js";
import { Resource } from "../models/Resource";

const resources = {
  [RESOURCE.MONEY]: ref<Resource>(new Resource(RESOURCE.MONEY)),
  [RESOURCE.MINING]: ref<Resource>(new Resource(RESOURCE.MINING)),
  [RESOURCE.SCIENCE]: ref<Resource>(new Resource(RESOURCE.SCIENCE)),
};
const storageMultiplier = ref<Decimal>(new Decimal(1));

export const useResource = () => {
  const { establishMessage, setShownMessage, hasShownMessage } = useMessage();

  const addResource = (type: RESOURCE, amount: Decimal) => {
    const resource = resources[type];
    const maxResource = resources[type].value.maxAmount;

    if (resource && maxResource) {
      resource.value.add(amount);
      if (resource.value.amount.equals(maxResource)) {
        if (!hasShownMessage(type)) {
          establishMessage(
            MessageType.WARNING,
            `Your ${type} storage is full!`
          );
          setShownMessage(type, true);
        }
      } else {
        setShownMessage(type, false);
      }
    }
  };

  const subtractResource = (type: RESOURCE, amount: Decimal) => {
    const resource = resources[type];
    if (resource) {
      resource.value.subtract(amount);
    }
  };

  const upgradeStorage = (type: RESOURCE) => {
    const resource = resources[type];
    if (resource) {
      resource.value.upgradeStorage();
    }
  };

  const resetResources = () => {
    storageMultiplier.value = new Decimal(1);
    Object.values(resources).forEach((resource) => {
      resource.value.reset();
    });
  }

  const upgradeAllStorage = (multiplier: number) => {
    storageMultiplier.value = storageMultiplier.value.times(multiplier);
    Object.values(resources).forEach((resource) => {
      resource.value.upgradeStorage(multiplier);
    });
  }

  return {
    resources,
    addResource,
    subtractResource,
    upgradeStorage,
    resetResources,
    upgradeAllStorage,
    storageMultiplier
  };
};
