import { useAlchemyStore } from "@/stores/useAlchemyStore";
import { usePlayer } from "@/composable/usePlayer";
import { useWorkers } from "@/composable/useWorkers";


let last: number | null = null;

export const backgroundActivity = () => {
  const { infusionProduction } = useAlchemyStore();
  const { regenHealth } = usePlayer();
  const { gatherResources } = useWorkers();
  if (last === null) {
    last = Date.now();
  }
  const now = Date.now();
  const deltaTime = (now - last) / 1000; // Convert to seconds
  last = now;

  infusionProduction(deltaTime);
  gatherResources(deltaTime);
  regenHealth(deltaTime);
};