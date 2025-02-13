import type { TalentNode } from "@/models/talents/TalentNode";
import Decimal from "break_eternity.js";
import { computed, ref } from "vue";
import { useResource } from "@/composable/useResource";
import { useAlchemy } from "@/composable/useAlchemy";
import { useGear } from "@/composable/useGear";
import { useMap } from "@/composable/useMap";
import { useMonsters } from "@/composable/useMonsters";
import { usePlayer } from "@/composable/usePlayer";
import { useBuildings } from "@/composable/useBuildings";
import { useTab } from "@/composable/useTab";
import { useActionLog } from "@/composable/useActionLog";
import { MessageType } from "@/composable/useMessage";
import { saveSession } from "@/utils/localStorage";
import { talentNodes } from "@/data/talent";
import { useWorkersStore } from "@/stores/useWorkerStore";
import { useResearchStore } from "@/stores/useResearchStore";

const isReincarnationOpen = ref(false);
const isReincarnationUnlocked = ref(false);
const points = ref<Decimal>(new Decimal(30));
const learnedTalents = computed(() =>
  Object.values(talentNodes).filter((talent) => talent.level.gt(0))
);
const nextPoints = computed(() => {
  const { map } = useMonsters();
  return (map.value - 9) * 2;
});

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
    isReincarnationOpen.value = false;
    isReincarnationUnlocked.value = false;
    const { resetResources } = useResource();
    const { resetAlchemy } = useAlchemy();
    const { resetGear } = useGear();
    const { resetMaps } = useMap();
    const { resetMonsters } = useMonsters();
    const { resetMultipliers } = usePlayer();
    const { resetBuildings } = useBuildings();
    const { resetTabState } = useTab();

    resetResources();
    resetAlchemy();
    resetGear();
    resetMaps();
    resetMonsters();
    resetMultipliers();
    resetBuildings();
    resetTabState();
    points.value = new Decimal(30);
    //reset all pinia stores
    const workerStore = useWorkersStore();
    const researchStore = useResearchStore();
    workerStore.$reset();
    researchStore.$reset();

    // confirm talents after clearing all data to avoid any conflicts
    reapplyTalentsAfterReincarnation();
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
  };

  const confirmTalentQueue = () => {
    const { clearLog, logMessage } = useActionLog();
    clearLog();
    logMessage(
      "Woah! You've reincarnated, let's see what you've learned...",
      MessageType.SUCCESS
    );
    talentQueue.value.forEach((talent) => {
      talent.learn();
    });
    clearTalentQueue();
    saveSession();
  };

  const clearTalentQueue = () => {
    talentQueue.value = [];
  };

  const reapplyTalentsAfterReincarnation = () => {
    learnedTalents.value.forEach((talent) => {
      for (let i = 0; i < talent.level.toNumber(); i++) {
        talent.effect();
      }
    });
  };

  const onCompleteMap = () => {
    points.value = points.value.plus(nextPoints.value);
    const { logMessage } = useActionLog();
    logMessage(
      `You've completed map ${useMonsters().map.value} and gained ${nextPoints.value} talent points!`,
      MessageType.SUCCESS
    );
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
    onCompleteMap,
    points,
    pointsSpent,
    talentQueue,
    nextPoints,
  };
};
