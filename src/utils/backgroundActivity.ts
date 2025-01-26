import { useAlchemy } from "../composable/useAlchemy";
import { usePlayer } from "../composable/usePlayer";
import { useWorkers } from "../composable/useWorkers";

const { gatherResources } = useWorkers();
const { regenHealth } = usePlayer();
const { infusionProduction } = useAlchemy();

export const backgroundActivity = (ticksPerSecond: number = 1) => {
  infusionProduction(ticksPerSecond);
  gatherResources(ticksPerSecond);
  regenHealth(ticksPerSecond);
};
