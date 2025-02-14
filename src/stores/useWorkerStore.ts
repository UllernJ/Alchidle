import { defineStore } from "pinia";
import type { BaseWorker } from "@/models/worker/BaseWorker";
import { Worker } from "@/models/worker/Worker";
import { EffectWorker } from "@/models/worker/EffectWorker";
import { createInitialWorkers } from "@/factories/WorkerFactory";
import Decimal from "break_eternity.js";

export const useWorkersStore = defineStore("workers", {
  state: () => {
    const workers = createInitialWorkers();
    return {
      workerMultiplier: new Decimal(1) as Decimal,
      /*
      eachWorkerBoostPercentage is the value that adds a boost for each worker.
      For example, if eachWorkerBoostPercentage is 1, 
      and you have 10 workers, you will get a 10% boost to your production.
      */
      eachWorkerBoostPercentage: new Decimal(1) as Decimal,
      workers: workers as BaseWorker[],
      resourceWorkers: workers.filter(
        (worker) => worker instanceof Worker
      ) as Worker[],
      effectWorkers: workers.filter(
        (worker) => worker instanceof EffectWorker
      ) as EffectWorker[],
      trainer: workers.find((w) => w.name === "Trainer") as EffectWorker,
      priest: workers.find((w) => w.name === "Priest") as EffectWorker,
      resourceWorkersList: {
        banker: workers.find((w) => w.name === "Banker") as Worker,
        miner: workers.find((w) => w.name === "Miner") as Worker,
        scientist: workers.find((w) => w.name === "Scientist") as Worker,
      },
    };
  },
});
