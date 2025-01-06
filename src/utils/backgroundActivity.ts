import { usePlayer } from "../composable/usePlayer";
import { useWorkers } from "../composable/useWorkers";

const { gatherResources } = useWorkers();
const { regenHealth } = usePlayer();

export const backgroundActivity = () => {
  gatherResources();
  regenHealth();
};
