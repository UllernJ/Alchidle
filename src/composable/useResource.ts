import { ref } from "vue";
import { useMessage, MessageType } from "./useMessage";
import { RESOURCE } from "../types";

const resources = {
  [RESOURCE.MONEY]: ref<number>(0),
  [`max${RESOURCE.MONEY}`]: ref<number>(200),
  [RESOURCE.MINING]: ref<number>(0),
  [`max${RESOURCE.MINING}`]: ref<number>(200),
  [RESOURCE.SCIENCE]: ref<number>(0),
  [`max${RESOURCE.SCIENCE}`]: ref<number>(200),
  [RESOURCE.ALCHEMY]: ref<number>(0),
  [`max${RESOURCE.ALCHEMY}`]: ref<number>(200),
};

export const useResource = () => {
  const { establishMessage, setShownMessage, hasShownMessage } = useMessage();

  const addResource = (type: RESOURCE, amount: number) => {
    const resource = resources[type];
    const maxResource = resources[`max${type}`];

    if (resource && maxResource) {
      resource.value = Math.min(resource.value + amount, maxResource.value);
      if (resource.value === maxResource.value) {
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

  const subtractResource = (type: RESOURCE, amount: number) => {
    const resource = resources[type];
    if (resource) {
      resource.value = Math.max(resource.value - amount, 0);
    }
  };

  const upgradeStorage = (type: RESOURCE) => {
    const maxResource = resources[`max${type}`];
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
