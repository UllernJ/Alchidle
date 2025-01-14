import { ref } from "vue";
import { bankerIcon, minerIcon, scientistIcon } from "../icons/icons";
import { Worker } from "../models/Worker";
import { RESOURCE } from "../types";

export const BANKER = ref<Worker>(new Worker(
  "Banker",
  1,
  RESOURCE.MONEY,
  0,
  {
    resource: RESOURCE.MONEY,
    value: 50,
  },
  "Manages your economy.",
  bankerIcon
));

export const MINER = ref<Worker>(new Worker(
  "Miner",
  1,
  RESOURCE.MINING,
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
  1,
  RESOURCE.SCIENCE,
  0,
  {
    resource: RESOURCE.MONEY,
    value: 50,
  },
  "Researches new technologies.",
  scientistIcon
))

export const WORKERS = ref<Worker[]>([BANKER.value, MINER.value, SCIENTIST.value]);
