import { ref } from "vue";
import { bankerIcon, minerIcon, priestIcon, scientistIcon, trainerIcon } from "../icons/icons";
import { Worker } from "../models/worker/Worker";
import { RESOURCE } from "../types";
import { BaseWorker } from "../models/worker/BaseWorker";

export const BANKER = ref<Worker>(new Worker(
  "Banker",
  { resource: RESOURCE.MONEY, rate: 1 },
  0,
  {
    resource: RESOURCE.MONEY,
    value: 25,
  },
  "Manages your economy.",
  bankerIcon,
  1.07
));

export const MINER = ref<Worker>(new Worker(
  "Miner",
  { resource: RESOURCE.MINING, rate: 1 },
  0,
  {
    resource: RESOURCE.MONEY,
    value: 50,
  },
  "Mines for ores.",
  minerIcon,
  1.07
));

export const SCIENTIST = ref<Worker>(new Worker(
  "Scientist",
  { resource: RESOURCE.SCIENCE, rate: 1 },
  0,
  {
    resource: RESOURCE.MONEY,
    value: 100,
  },
  "Researches new technologies.",
  scientistIcon,
  1.07
))

export const TRAINER = ref<BaseWorker>(new BaseWorker(
  "Trainer",
  0,
  {
    resource: RESOURCE.MONEY,
    value: 100,
  },
  "Increases your defence by 5.",
  trainerIcon,
  1.75
));

export const PRIEST = ref<BaseWorker>(new BaseWorker(
  "Priest",
  0,
  {
    resource: RESOURCE.MONEY,
    value: 300,
  },
  "Increases your health regeneration by 1.",
  priestIcon,
  3
));


export const WORKERS = ref<BaseWorker[]>([BANKER.value, MINER.value, SCIENTIST.value, TRAINER.value, PRIEST.value]);
