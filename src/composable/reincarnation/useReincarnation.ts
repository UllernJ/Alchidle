import type { TalentNode } from "@/models/talents/TalentNode";
import Decimal from "break_eternity.js";
import { computed, ref } from "vue";

const isReincarnationOpen = ref(false);
const isReincarnationUnlocked = ref(false);
const points = ref<Decimal>(new Decimal(35));
const pointsSpent = computed(() => {
  const counts = new Map();
  return talentQueue.value.reduce((acc, talent) => {
    const count = (counts.get(talent.title) || 0) + 1;
    counts.set(talent.title, count);
    return acc.add(talent.getPriceFromQuantity(count - 1)); // Use incremental quantity
  }, new Decimal(0));
});
const talentQueue = ref<TalentNode[]>([]);

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

  const addTalentToQueue = (talent: TalentNode) => {
    talentQueue.value.push(talent);
  }

  const confirmTalentQueue = () => {
    talentQueue.value.forEach(talent => {
      talent.learn();
    });
    clearTalentQueue();
  }
  
  const clearTalentQueue = () => {
    talentQueue.value = [];
  }

  return {
    isReincarnationOpen,
    isReincarnationUnlocked,
    openReincarnation,
    closeReincarnation,
    unlockReincarnation,
    reincarnate,
    addTalentToQueue,
    confirmTalentQueue,
    clearTalentQueue,
    points,
    pointsSpent,
    talentQueue
  };
};
