import { ref } from "vue";
import { useMonsters } from "../../composable/useMonsters";
import { Research } from "../../models/research/Research";
import { isDev } from "../../utils/dev";

export const workerHutBlueprintResearch = ref(new Research(
    "Blueprint: Worker Hut",
    "Unlocks the ability to build worker huts, boosting their life qualities and production.",
    isDev ? 0 : 50000,
    () => {
        const {map} = useMonsters();
        return map.value >= 10 || isDev;
    }
));