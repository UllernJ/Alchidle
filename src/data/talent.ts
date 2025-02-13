import { reactive } from "vue";
import { TalentNode } from "@/models/talents/TalentNode";
import { TalentTree } from "@/models/talents/TalentTree";
import {
  mdiAccountHardHat,
  mdiLambda,
  mdiSale,
  mdiTargetAccount,
  mdiSpeedometer,
  mdiHeart,
  mdiRun,
  mdiCashMultiple,
  mdiSword,
  mdiHammerWrench,
  mdiTreasureChest,
  mdiHeartPulse,
  mdiRunFast,
  mdiCurrencyUsd,
  mdiBookOpenVariant,
  mdiShield,
  mdiTarget,
  mdiFlask,
  mdiGhost,
  mdiPickaxe,
  mdiHeadCog,
  mdiAxeBattle,
  mdiGhostOff,
  mdiHandExtended,
} from "@mdi/js";
import Decimal from "break_eternity.js";
import { usePlayer } from "@/composable/usePlayer";
import { useWorkers } from "@/composable/useWorkers";
import { useMonsters } from "@/composable/useMonsters";
import { useGear } from "@/composable/useGear";
import { useResource } from "@/composable/useResource";
import { useAlchemyStore } from "@/stores/useAlchemyStore";

export const talentNodes = reactive<Record<string, TalentNode>>({
  //layer 1
  increaseHealth: new TalentNode(
    "Increases health by 5%",
    new Decimal(1),
    mdiHeart,
    () => {
      const { upgradeHealthMultiplier } = usePlayer()
      upgradeHealthMultiplier(1.05)
    }
  ),
  //layer 2
  increaseDamage: new TalentNode(
    "Increases damage by 5%",
    new Decimal(2),
    mdiSword,
    () => {
      const { upgradeAttackPower } = usePlayer()
      upgradeAttackPower(1.05)
    }
  ),
  increaseWorkerEfficiency: new TalentNode(
    "Increases workers output by 10%",
    new Decimal(2),
    mdiAccountHardHat,
    () => {
      const { upgradeWorkers } = useWorkers()
      upgradeWorkers(1.1)
    }
  ),
  //layer 3
  increaseDefense: new TalentNode(
    "Increases defense by 5%",
    new Decimal(3),
    mdiShield,
    () => {
      const { upgradeDefensePower } = usePlayer()
      upgradeDefensePower(1.05)
    }
  ),
  increaseEnergy: new TalentNode(
    "Increases player output by 25%",
    new Decimal(3),
    mdiHandExtended,
    () => {
      const { upgradeProductionRate } = usePlayer()
      upgradeProductionRate(1.25)
    }
  ),
  workerSale: new TalentNode(
    "Decrease worker cost by 5%",
    new Decimal(3),
    mdiSale,
    () => {
      const { decreaseWorkerCosts } = useWorkers()
      decreaseWorkerCosts(0.95)
    }
  ),
  decreaseEnemyDamage: new TalentNode(
    "Decreases enemy damage by 5%",
    new Decimal(4),
    mdiTargetAccount,
    () => {
      const { decreaseMonsterDamage } = useMonsters()
      decreaseMonsterDamage(0.95)
    }
  ),
  //layer 4
  improvedBlacksmithing: new TalentNode(
    "Improve your blacksmithing skills, making your gear 5% cheaper",
    new Decimal(4),
    mdiHammerWrench,
    () => {
      const { decreaseCostMultiplier } = useGear()
      decreaseCostMultiplier(0.95)
    }
  ),
  // workersUnion: new TalentNode(
  //   "Each worker increase all other workers output by 0.1%",
  //   new Decimal(3),
  //   mdiAccountHardHat,
  //   () => {

  //   }
  // ),
  test6: new TalentNode(
    "TEST1",
    new Decimal(1),
    mdiShield,
    () => {}
  ),
  treasureHunter: new TalentNode(
    "Increase drop amount by 10%",
    new Decimal(4),
    mdiTreasureChest,
    () => {
      const { upgradeMonsterDrop } = useMonsters()
      upgradeMonsterDrop(1.1)
    }
  ),
  decreaseEnemyHealth: new TalentNode(
    "Decrease enemy health by 5%",
    new Decimal(3),
    mdiShield,
    () => {
      const { decreaseMonsterHealth } = useMonsters()
      decreaseMonsterHealth(0.95)
    }
  ),
  increaseWealth: new TalentNode(
    "test2",
    new Decimal(1),
    mdiCashMultiple,
    () => {}
  ),
  increaseStorage: new TalentNode(
    "Storage increase by 5%",
    new Decimal(1),
    mdiLambda,
    () => {
      const { upgradeAllStorage } = useResource()
      upgradeAllStorage(1.05)
    }
  ),
  test4: new TalentNode(
    "TEST3",
    new Decimal(1),
    mdiShield,
    () => {}
  ),
  //layer 5
  test: new TalentNode(
    "Test4",
    new Decimal(1),
    mdiShield,
    () => {}
  ),
  test2: new TalentNode(
    "Test5",
    new Decimal(1),
    mdiShield,
    () => {}
  ),
  test3: new TalentNode(
    "Test6",
    new Decimal(1),
    mdiShield,
    () => {}
  ),
  increaseSpeed: new TalentNode(
    "Attack speed increases by 10%",
    new Decimal(8),
    mdiSpeedometer,
    () => {
      const { upgradeAttackSpeed } = usePlayer()
      upgradeAttackSpeed(1.1)
    }
  ),
  alchemicalExpertise: new TalentNode(
    "Increase alchemists effiency by 10%",
    new Decimal(10),
    mdiFlask,
    () => {
      const { upgradeAlchemyEfficiency } = useAlchemyStore()
      upgradeAlchemyEfficiency(1.1)
    }
  ),
  regeneration: new TalentNode(
    "Increase health regeneration by 5%",
    new Decimal(4),
    mdiHeartPulse,
    () => {
      const { upgradeRegen } = usePlayer()
      upgradeRegen(1.05)
    }
  ),
  quickReflexes: new TalentNode(
    "test15",
    new Decimal(2),
    mdiRunFast,
    () => {}
  ),
  masterTrader: new TalentNode(
    "test16",
    new Decimal(3),
    mdiCurrencyUsd,
    () => {}
  ),
  arcaneKnowledge: new TalentNode(
    "test17",
    new Decimal(4),
    mdiBookOpenVariant,
    () => {}
  ),
  increaseRunSpeed: new TalentNode(
    "test18",
    new Decimal(1),
    mdiRun,
    () => {}
  ),
  swiftMovement: new TalentNode(
    "test",
    new Decimal(2),
    mdiRunFast,
    () => {}
  ),
  precisionAim: new TalentNode(
    "test",
    new Decimal(2),
    mdiTarget,
    () => {}
  ),
  summonersPact: new TalentNode(
    "test",
    new Decimal(4),
    mdiGhost,
    () => {}
  ),
  resourceful: new TalentNode(
    "test",
    new Decimal(2),
    mdiPickaxe,
    () => {}
  ),
  focusedMind: new TalentNode(
    "test",
    new Decimal(3),
    mdiHeadCog,
    () => {}
  ),
  berserkersRage: new TalentNode(
    "test",
    new Decimal(4),
    mdiAxeBattle,
    () => {}
  ),
  etherealForm: new TalentNode(
    "test",
    new Decimal(5),
    mdiGhostOff,
    () => {}
  ),
  alchemyMastery: new TalentNode(
    "test",
    new Decimal(4),
    mdiFlask,
    () => {}
  ),
});

export const upTree = reactive(
  new TalentTree(
    new TalentTree(
      new TalentTree(
        new TalentTree(
          new TalentTree(null, null, talentNodes.regeneration),
          new TalentTree(null, null, talentNodes.test3),
          talentNodes.improvedBlacksmithing
        ),
        new TalentTree(
          new TalentTree(null, null, talentNodes.alchemyMastery),
          new TalentTree(null, null, talentNodes.test2),
          talentNodes.test6
        ),
        talentNodes.increaseDefense
      ),
      new TalentTree(
        new TalentTree(
          new TalentTree(null, null, talentNodes.quickReflexes),
          new TalentTree(null, null, talentNodes.masterTrader),
          talentNodes.treasureHunter
        ),
        new TalentTree(
          new TalentTree(null, null, talentNodes.arcaneKnowledge),
          new TalentTree(null, null, talentNodes.increaseRunSpeed),
          talentNodes.decreaseEnemyHealth
        ),
        talentNodes.increaseEnergy
      ),
      talentNodes.increaseDamage
    ),
    new TalentTree(
      new TalentTree(
        new TalentTree(
          new TalentTree(null, null, talentNodes.swiftMovement),
          new TalentTree(null, null, talentNodes.precisionAim),
          talentNodes.increaseWealth
        ),
        new TalentTree(
          new TalentTree(null, null, talentNodes.alchemicalExpertise),
          new TalentTree(null, null, talentNodes.summonersPact),
          talentNodes.increaseStorage
        ),
        talentNodes.workerSale
      ),
      new TalentTree(
        new TalentTree(
          new TalentTree(null, null, talentNodes.resourceful),
          new TalentTree(null, null, talentNodes.focusedMind),
          talentNodes.test4
        ),
        new TalentTree(
          new TalentTree(null, null, talentNodes.berserkersRage),
          new TalentTree(null, null, talentNodes.etherealForm),
          talentNodes.increaseSpeed
        ),
        talentNodes.decreaseEnemyDamage
      ),
      talentNodes.increaseWorkerEfficiency
    ),
    talentNodes.increaseHealth
  )
);
