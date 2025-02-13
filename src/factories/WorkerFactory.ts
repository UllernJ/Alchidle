import { Worker } from "@/models/worker/Worker";
import { EFFECT_RESOURCE, EffectWorker } from "@/models/worker/EffectWorker";
import { RESOURCE } from "@/types";
import Decimal from "break_eternity.js";
import { bankerIcon, minerIcon, priestIcon, scientistIcon, trainerIcon } from "@/icons/icons";
import { blacksmithingResearch, blockingResearch } from "@/data/research";

const createBanker = () => new Worker(
  "Banker",
  { resource: RESOURCE.MONEY, rate: new Decimal(1) },
  { resource: RESOURCE.MONEY, value: new Decimal(15) },
  "Manages your economy.",
  bankerIcon,
  1.07
);

const createMiner = () => new Worker(
  "Miner",
  { resource: RESOURCE.MINING, rate: new Decimal(1) },
  { resource: RESOURCE.MONEY, value: new Decimal(30) },
  "Mines for ores.",
  minerIcon,
  1.07,
  () => blacksmithingResearch.value.unlocked
);

const createScientist = () => new Worker(
  "Scientist",
  { resource: RESOURCE.SCIENCE, rate: new Decimal(1) },
  { resource: RESOURCE.MONEY, value: new Decimal(50) },
  "Researches new technologies.",
  scientistIcon,
  1.07
);

const createPriest = () => new EffectWorker(
  "Priest",
  {
    rate: new Decimal(1),
    resource: EFFECT_RESOURCE.REGEN,
  },
  { resource: RESOURCE.MONEY, value: new Decimal(100) },
  "Increases your health regeneration by 1.",
  priestIcon,
  1.75
);

const createTrainer = () => new EffectWorker(
  "Trainer",
  {
    rate: new Decimal(5),
    resource: EFFECT_RESOURCE.DEFENCE,
  },
  { resource: RESOURCE.MONEY, value: new Decimal(300) },
  "Increases your defense power by 1.",
  trainerIcon,
  1.75,
  () => blockingResearch.value.unlocked
);


export const createInitialWorkers = () => [
    createBanker(),
    createMiner(),
    createScientist(),
    createPriest(),
    createTrainer()
  ];