export type WorkerStation = {
  name: "WORKER_A" | "WORKER_B";
  rate: number;
  numberOfWorkers: number;
  cost: number;
  resource: RESOURCE
};

export enum RESOURCE {
  MONEY = "Money",
  WOODCUTTING = "Woodcutting",
  MINING = "Mining",
  FARMING = "Farming",
  SCIENCE = "Science",
  ALCHEMY = "Alchemy"
}
