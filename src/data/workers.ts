import { ref } from "vue";
import { bankerIcon, minerIcon, scientistIcon } from "../icons/icons";
import { Worker } from "../models/worker/Worker";
import { RESOURCE } from "../types";

export const BANKER = ref<Worker>(new Worker(
  "Banker",
  { resource: RESOURCE.MONEY, rate: 25 },
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

export const WORKERS = ref<Worker[]>([BANKER.value, MINER.value, SCIENTIST.value]);
