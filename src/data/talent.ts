import { reactive } from "vue";
import { TalentNode } from "@/models/talents/TalentNode";
import { TalentTree } from "@/models/talents/TalentTree";
import {
  mdiAccountHardHat,
  mdiLambda,
  mdiSale,
  mdiSwordCross,
  mdiTargetAccount,
  mdiSpeedometer,
  mdiShieldAccount,
  mdiHeart,
  mdiRun,
  mdiBatteryHigh,
  mdiBrain,
  mdiCashMultiple,
  mdiSword,
  mdiHammerWrench,
  mdiFire,
  mdiTreasureChest,
  mdiEyeOff,
  mdiHeartPulse,
  mdiMagicStaff,
  mdiBomb,
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
} from "@mdi/js";
import Decimal from "break_eternity.js";

const talentNodes = reactive({
  increaseDamage: new TalentNode(
    "Increase damage by 5%",
    "Increase damage by 5%",
    new Decimal(1),
    mdiSwordCross,
    () => {}
  ),
  increaseWorkerEfficiency: new TalentNode(
    "Increases workers efficiency by 10%",
    "Increases workers efficiency by 10%",
    new Decimal(1),
    mdiAccountHardHat,
    () => {}
  ),
  decreaseEnemyDamage: new TalentNode(
    "Decreases enemy damage by 5%",
    "Decreases enemy damage by 5%",
    new Decimal(1),
    mdiTargetAccount,
    () => {}
  ),
  increaseStorage: new TalentNode(
    "Storage increase",
    "Increase storage by 10%",
    new Decimal(1),
    mdiLambda,
    () => {}
  ),
  workerSale: new TalentNode(
    "Worker sale!",
    "Decreases worker cost by 10%",
    new Decimal(1),
    mdiSale,
    () => {}
  ),
  increaseSpeed: new TalentNode(
    "Increase speed by 5%",
    "Increase speed by 5%",
    new Decimal(1),
    mdiSpeedometer,
    () => {}
  ),
  increaseDefense: new TalentNode(
    "Increase defense by 5%",
    "Increase defense by 5%",
    new Decimal(1),
    mdiShieldAccount,
    () => {}
  ),
  increaseHealth: new TalentNode(
    "Increase health by 10%",
    "Increase health by 10%",
    new Decimal(1),
    mdiHeart,
    () => {}
  ),
  increaseRunSpeed: new TalentNode(
    "Increase run speed by 10%",
    "Increase run speed by 10%",
    new Decimal(1),
    mdiRun,
    () => {}
  ),
  increaseEnergy: new TalentNode(
    "Increase energy by 10%",
    "Increase energy by 10%",
    new Decimal(1),
    mdiBatteryHigh,
    () => {}
  ),
  increaseIntelligence: new TalentNode(
    "Increase intelligence by 10%",
    "Increase intelligence by 10%",
    new Decimal(1),
    mdiBrain,
    () => {}
  ),
  increaseWealth: new TalentNode(
    "Increase wealth by 10%",
    "Increase wealth by 10%",
    new Decimal(1),
    mdiCashMultiple,
    () => {}
  ),
  // New talents
  criticalStrike: new TalentNode(
    "Critical Strike",
    "Your attacks have a 10% chance to deal double damage.",
    new Decimal(2),
    mdiSword,
    () => {}
  ),
  efficientCrafting: new TalentNode(
    "Efficient Crafting",
    "Reduces crafting time by 20%.",
    new Decimal(2),
    mdiHammerWrench,
    () => {}
  ),
  elementalResistance: new TalentNode(
    "Elemental Resistance",
    "Reduces damage from elemental attacks by 15%.",
    new Decimal(3),
    mdiFire,
    () => {}
  ),
  luckyFind: new TalentNode(
    "Lucky Find",
    "Increases the chance of finding rare items by 10%.",
    new Decimal(2),
    mdiTreasureChest,
    () => {}
  ),
  stealthMastery: new TalentNode(
    "Stealth Mastery",
    "Reduces detection range by enemies by 30%.",
    new Decimal(3),
    mdiEyeOff,
    () => {}
  ),
  regeneration: new TalentNode(
    "Regeneration",
    "Regenerate 1% of your health every 5 seconds.",
    new Decimal(4),
    mdiHeartPulse,
    () => {}
  ),
  manaEfficiency: new TalentNode(
    "Mana Efficiency",
    "Reduces mana cost of abilities by 15%.",
    new Decimal(3),
    mdiMagicStaff,
    () => {}
  ),
  explosivePower: new TalentNode(
    "Explosive Power",
    "Your attacks have a 5% chance to explode, dealing area damage.",
    new Decimal(4),
    mdiBomb,
    () => {}
  ),
  quickReflexes: new TalentNode(
    "Quick Reflexes",
    "Increases dodge chance by 10%.",
    new Decimal(2),
    mdiRunFast,
    () => {}
  ),
  masterTrader: new TalentNode(
    "Master Trader",
    "Increases sell prices by 20% and reduces buy prices by 10%.",
    new Decimal(3),
    mdiCurrencyUsd,
    () => {}
  ),
  arcaneKnowledge: new TalentNode(
    "Arcane Knowledge",
    "Increases spell damage by 15%.",
    new Decimal(4),
    mdiBookOpenVariant,
    () => {}
  ),
  toughSkin: new TalentNode(
    "Tough Skin",
    "Reduces physical damage taken by 10%.",
    new Decimal(3),
    mdiShield,
    () => {}
  ),
  swiftMovement: new TalentNode(
    "Swift Movement",
    "Increases movement speed by 15%.",
    new Decimal(2),
    mdiRunFast,
    () => {}
  ),
  precisionAim: new TalentNode(
    "Precision Aim",
    "Increases critical hit chance by 5%.",
    new Decimal(2),
    mdiTarget,
    () => {}
  ),
  alchemicalExpertise: new TalentNode(
    "Alchemical Expertise",
    "Potions are 25% more effective.",
    new Decimal(3),
    mdiFlask,
    () => {}
  ),
  summonersPact: new TalentNode(
    "Summoner's Pact",
    "Increases the strength of summoned creatures by 20%.",
    new Decimal(4),
    mdiGhost,
    () => {}
  ),
  resourceful: new TalentNode(
    "Resourceful",
    "Gain 10% more resources from gathering.",
    new Decimal(2),
    mdiPickaxe,
    () => {}
  ),
  focusedMind: new TalentNode(
    "Focused Mind",
    "Reduces cooldowns by 10%.",
    new Decimal(3),
    mdiHeadCog,
    () => {}
  ),
  berserkersRage: new TalentNode(
    "Berserker's Rage",
    "Deal 20% more damage when below 30% health.",
    new Decimal(4),
    mdiAxeBattle,
    () => {}
  ),
  etherealForm: new TalentNode(
    "Ethereal Form",
    "Gain a 10% chance to avoid all damage.",
    new Decimal(5),
    mdiGhostOff,
    () => {}
  ),
  treasureHunter: new TalentNode(
    "Treasure Hunter",
    "Increases the chance of finding rare items by 10%.",
    new Decimal(2),
    mdiTreasureChest,
    () => {}
  ),
  improvedBlacksmithing: new TalentNode(
    "Improved Blacksmithing",
    "Increases the chance of crafting rare items by 10%.",
    new Decimal(2),
    mdiHammerWrench,
    () => {}
  ),
  workersUnion: new TalentNode(
    "Workers Union",
    "Increases worker efficiency by 10%.",
    new Decimal(3),
    mdiAccountHardHat,
    () => {}
  ),
  alchemyMastery: new TalentNode(
    "Alchemy Mastery",
    "Increases the strength of potions by 20%.",
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
          new TalentTree(null, null, talentNodes.increaseDamage),
          new TalentTree(null, null, talentNodes.increaseWorkerEfficiency),
          talentNodes.improvedBlacksmithing
        ),
        new TalentTree(
          new TalentTree(null, null, talentNodes.alchemyMastery),
          new TalentTree(null, null, talentNodes.workerSale),
          talentNodes.workersUnion
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
          new TalentTree(null, null, talentNodes.toughSkin),
          talentNodes.increaseRunSpeed
        ),
        talentNodes.increaseEnergy
      ),
      talentNodes.increaseIntelligence
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
          talentNodes.increaseDamage
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
