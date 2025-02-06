import type { TalentNode } from "@/models/talents/TalentNode";
import Decimal from "break_eternity.js";
import { computed, ref } from "vue";
import { useResource } from "../useResource";
import { useAlchemy } from "../useAlchemy";
import { useResearch } from "../useResearch";
import { useGear } from "../useGear";
import { useMap } from "../useMap";
import { useMonsters } from "../useMonsters";
import { useWorkers } from "../useWorkers";
import { usePlayer } from "../usePlayer";
import { useBuildings } from "../useBuildings";
import { useTab } from "../useTab";

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
    clearTalentQueue();
  };

  const unlockReincarnation = () => {
    isReincarnationUnlocked.value = true;
  };

  const reincarnate = () => {
    points.value = new Decimal(0);
    isReincarnationOpen.value = false;
    isReincarnationUnlocked.value = false;
    const { resetResources } = useResource();
    const { resetAlchemy } = useAlchemy();
    const { resetResearch } = useResearch();
    const { resetGear } = useGear();
    const { resetMaps } = useMap();
    const { resetMonsters } = useMonsters();
    const { resetMultipliers } = usePlayer();
    const { resetWorkers } = useWorkers();
    const { resetBuildings } = useBuildings();
    const { resetTabState } = useTab()

    resetResources();
    resetAlchemy();
    resetResearch();
    resetGear();
    resetMaps();
    resetMonsters();
    resetMultipliers();
    resetWorkers();
    resetBuildings();
    resetTabState();

    // confirm talents after clearing all data to avoid any conflicts
    confirmTalentQueue();
  };

  const addTalentToQueue = (talent: TalentNode) => {
    talentQueue.value.push(talent);
  };

  const removeTalentFromQueue = (talent: TalentNode) => {
    if (!talentQueue.value.includes(talent)) {
      return;
    }
    const index = talentQueue.value.indexOf(talent);
    if (index > -1) {
      talentQueue.value.splice(index, 1);
    }
  }

  const confirmTalentQueue = () => {
    talentQueue.value.forEach((talent) => {
      talent.learn();
    });
    clearTalentQueue();
  };

  const clearTalentQueue = () => {
    talentQueue.value = [];
  };

  return {
    isReincarnationOpen,
    isReincarnationUnlocked,
    openReincarnation,
    closeReincarnation,
    unlockReincarnation,
    reincarnate,
    addTalentToQueue,
    clearTalentQueue,
    removeTalentFromQueue,
    points,
    pointsSpent,
    talentQueue,
  };
};
