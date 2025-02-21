import { computed, ref } from "vue";
import { useMessage, MessageType } from "./useMessage";
import { RESOURCE } from "../types";
import Decimal from "break_eternity.js";
import { Resource } from "../models/Resource";
import { refThrottled } from "@vueuse/core";

const resources = {
  [RESOURCE.MONEY]: ref<Resource>(new Resource(RESOURCE.MONEY)),
  [RESOURCE.MINING]: ref<Resource>(new Resource(RESOURCE.MINING)),
  [RESOURCE.SCIENCE]: ref<Resource>(new Resource(RESOURCE.SCIENCE)),
};

const _moneyAmount = computed(() => resources[RESOURCE.MONEY].value.amount);
const throttledMoneyAmount = refThrottled(_moneyAmount, 500);

const _miningAmount = computed(() => resources[RESOURCE.MINING].value.amount);
 
const throttledMiningAmount = refThrottled(_miningAmount, 500);

const _scienceAmount = computed(() => resources[RESOURCE.SCIENCE].value.amount);
 
const throttledScienceAmount = refThrottled(_scienceAmount, 500);

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
    throttledMoneyAmount,
    throttledMiningAmount,
    throttledScienceAmount,
    addResource,
    subtractResource,
    upgradeStorage,
    resetResources,
    upgradeAllStorage,
    storageMultiplier
  };
};
