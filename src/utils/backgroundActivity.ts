import { useAlchemy } from "../composable/useAlchemy";
import { usePlayer } from "../composable/usePlayer";
import { useWorkers } from "../composable/useWorkers";

const { gatherResources } = useWorkers();
const { regenHealth } = usePlayer();
const { infusionProduction } = useAlchemy();

let last: number | null = null;

export const backgroundActivity = () => {
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