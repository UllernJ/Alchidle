import { ref } from "vue";
import { Research } from "../../models/research/Research";
import { usePlayer } from "../../composable/usePlayer";
import { useMonsters } from "../../composable/useMonsters";

const { upgradeProductionRate, upgradeAttackPower, upgradeDefensePower } =
  usePlayer();
const { map } = useMonsters();

export const efficiencyResearch = ref(
  new Research(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    100,
    () => true,
    () => {
      upgradeProductionRate(2);
    }
  )
);

export const efficiencyResearchI = ref(
  new Research(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    1000,
    () => efficiencyResearch.value.unlocked && map.value >= 2,
    () => {
      upgradeProductionRate(2);
    }
  )
);

export const efficiencyResearchII = ref(
  new Research(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    10000,
    () => efficiencyResearchI.value.unlocked && map.value >= 3,
    () => {
      upgradeProductionRate(2);
    }
  )
);

export const efficiencyResearchIII = ref(
  new Research(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    100000,
    () => efficiencyResearchII.value.unlocked && map.value >= 4,
    () => {
      upgradeProductionRate(2);
    }
  )
);

export const efficiencyResearchIV = ref(
  new Research(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    1000000,
    () => efficiencyResearchIII.value.unlocked && map.value >= 5,
    () => {
      upgradeProductionRate(2);
    }
  )
);

export const combatTrainingResearch = ref(
  new Research(
    "Combat Training",
    "Increases your attack power by 10% (1.1x).",
    10000,
    () => map.value >= 2,
    () => {
      upgradeAttackPower();
    }
  )
);

export const fortificationResearch = ref(
  new Research(
    "Fortification",
    "Increases your defense power by 10% (1.1x).",
    150,
    () => combatTrainingResearch.value.unlocked,
    () => {
      upgradeDefensePower();
    }
  )
);
