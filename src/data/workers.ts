import { ref } from "vue";
import Decimal from "break_eternity.js";
import {
  bankerIcon,
  minerIcon,
  priestIcon,
  scientistIcon,
  trainerIcon,
} from "../icons/icons";
import { Worker } from "../models/worker/Worker";
import { RESOURCE } from "../types";
import { BaseWorker } from "../models/worker/BaseWorker";
import { EFFECT_RESOURCE, EffectWorker } from "../models/worker/EffectWorker";
import { blacksmithingResearch, blockingResearch } from "./research";

export const BANKER = ref<Worker>(
  new Worker(
    "Banker",
    { resource: RESOURCE.MONEY, rate: new Decimal(1) },
    {
      resource: RESOURCE.MONEY,
      value: new Decimal(15),
    },
    "Manages your economy.",
    bankerIcon,
    1.07
  )
);

export const MINER = ref<Worker>(
  new Worker(
    "Miner",
    { resource: RESOURCE.MINING, rate: new Decimal(1) },
    {
      resource: RESOURCE.MONEY,
      value: new Decimal(30),
    },
    "Mines for ores.",
    minerIcon,
    1.07,
    () => blacksmithingResearch.value.unlocked
  )
);

export const SCIENTIST = ref<Worker>(
  new Worker(
    "Scientist",
    { resource: RESOURCE.SCIENCE, rate: new Decimal(1) },
    {
      resource: RESOURCE.MONEY,
      value: new Decimal(75),
    },
    "Researches new technologies.",
    scientistIcon,
    1.07
  )
);

export const PRIEST = ref<EffectWorker>(
  new EffectWorker(
    "Priest",
    {
      rate: new Decimal(1),
      resource: EFFECT_RESOURCE.REGEN,
    },
    {
      resource: RESOURCE.MONEY,
      value: new Decimal(100),
    },
    "Increases your health regeneration by 1.",
    priestIcon,
    1.75
  )
);

export const TRAINER = ref<EffectWorker>(
  new EffectWorker(
    "Trainer",
    {
      rate: new Decimal(1),
      resource: EFFECT_RESOURCE.DEFENCE,
    },
    {
      resource: RESOURCE.MONEY,
      value: new Decimal(300),
    },
    "Increases your defence by 5.",
    trainerIcon,
    1.75,
    () => blockingResearch.value.unlocked
  )
);

export const WORKERS = ref<BaseWorker[]>([
  BANKER.value,
  MINER.value,
  SCIENTIST.value,
  PRIEST.value,
  TRAINER.value,
]);