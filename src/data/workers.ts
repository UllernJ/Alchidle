import { ref } from "vue";
import { bankerIcon, minerIcon, scientistIcon, trainerIcon } from "../icons/icons";
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
  bankerIcon
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
  minerIcon
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
  scientistIcon
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


export const WORKERS = ref<BaseWorker[]>([BANKER.value, MINER.value, SCIENTIST.value, TRAINER.value]);
