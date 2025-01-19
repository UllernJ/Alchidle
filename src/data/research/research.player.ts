import { ref } from "vue";
import { usePlayer } from "../../composable/usePlayer";
import { useMonsters } from "../../composable/useMonsters";
import { UpgradeableResearch } from "../../models/research/UpgradeableResearch";
import { RESEARCH_INTERVAL } from "../../models/research/ResearchInterval";

const { upgradeProductionRate, upgradeAttackPower, upgradeDefensePower } =
  usePlayer();
const { map } = useMonsters();

export const efficiencyResearch = ref(
  new UpgradeableResearch(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    100,
    () => true,
    2,
    RESEARCH_INTERVAL.EVERY,
    () => {
      upgradeProductionRate(2);
    }
  )
);

export const combatTrainingResearch = ref(
  new UpgradeableResearch(
    "Combat Training",
    "Increases your attack power by 10% (1.1x).",
    10000,
    () => map.value >= 2,
    10,
    RESEARCH_INTERVAL.EVERY_THIRD,
    () => {
      upgradeAttackPower();
    }
  )
);

export const fortificationResearch = ref(
  new UpgradeableResearch(
    "Fortification",
    "Increases your defense power by 10% (1.1x).",
    10000,
    () => combatTrainingResearch.value.level >= 1,
    10,
    RESEARCH_INTERVAL.EVERY_THIRD,
    () => {
      upgradeDefensePower();
    }
  )
);
