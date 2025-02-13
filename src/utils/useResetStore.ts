import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import { useGear } from "@/composable/useGear";
import { useMap } from "@/composable/useMap";
import { useMonsters } from "@/composable/useMonsters";
import { useResource } from "@/composable/useResource";
import { useTab } from "@/composable/useTab";
import { useAlchemyStore } from "@/stores/useAlchemyStore";
import { useBuildingsStore } from "@/stores/useBuildingsStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useResearchStore } from "@/stores/useResearchStore";
import { useWorkersStore } from "@/stores/useWorkerStore";
import Decimal from "break_eternity.js";

export const resetToDefault = () => {
  const { isReincarnationOpen, isReincarnationUnlocked, points } =
    useReincarnation();
  isReincarnationOpen.value = false;
  isReincarnationUnlocked.value = false;
  points.value = new Decimal(30);
  const { resetResources } = useResource();
  const { resetGear } = useGear();
  const { resetMaps } = useMap();
  const { resetMonsters } = useMonsters();
  const { resetTabState } = useTab();

  resetResources();
  resetGear();
  resetMaps();
  resetMonsters();
  resetTabState();
  const workerStore = useWorkersStore();
  const researchStore = useResearchStore();
  const buildingStore = useBuildingsStore();
  const alchemyStore = useAlchemyStore();
  const playerStore = usePlayerStore();
  workerStore.$reset();
  researchStore.$reset();
  buildingStore.$reset();
  alchemyStore.$reset();
  playerStore.$reset();

};
