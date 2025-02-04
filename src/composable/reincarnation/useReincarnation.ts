import Decimal from "break_eternity.js";
import { ref } from "vue";

const isReincarnationOpen = ref(false);
const isReincarnationUnlocked = ref(false);
const points = ref<Decimal>(new Decimal(35));

export const useReincarnation = () => {
  const openReincarnation = () => {
    isReincarnationOpen.value = true;
  };

  const closeReincarnation = () => {
    isReincarnationOpen.value = false;
  };

  const unlockReincarnation = () => {
    isReincarnationUnlocked.value = true;
  };

  const reincarnate = () => {
    points.value = new Decimal(0);
  };

  return {
    isReincarnationOpen,
    isReincarnationUnlocked,
    openReincarnation,
    closeReincarnation,
    unlockReincarnation,
    reincarnate,
    points,
  };
};
