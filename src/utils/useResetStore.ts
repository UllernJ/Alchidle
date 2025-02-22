import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import { useMap } from "@/composable/useMap";
import { useMonsters } from "@/composable/useMonsters";
import { useResource } from "@/composable/useResource";
import { useTab } from "@/composable/useTab";
import { useAlchemyStore } from "@/stores/useAlchemyStore";
import { useBuildingsStore } from "@/stores/useBuildingsStore";
import { useGearStore } from "@/stores/useGearStore";
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
  const { resetMaps } = useMap();
  const { resetMonsters } = useMonsters();
  const { resetTabState } = useTab();

  resetResources();
  resetMaps();
  resetMonsters();
  resetTabState();
  const workerStore = useWorkersStore();
  const researchStore = useResearchStore();
  const buildingStore = useBuildingsStore();
  const alchemyStore = useAlchemyStore();
  const playerStore = usePlayerStore();
  const gearStore = useGearStore();
  workerStore.$reset();
  researchStore.$reset();
  buildingStore.$reset();
  alchemyStore.$reset();
  playerStore.$reset();
  gearStore.$reset();

};
