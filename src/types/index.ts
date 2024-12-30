export type WorkerStation = {
  name: string;
  rate: number;
  numberOfWorkers: number;
  cost: number;
  resource: RESOURCE;
  description: string;
};

export enum RESOURCE {
  MONEY = "Money",
  WOODCUTTING = "Woodcutting",
  MINING = "Mining",
  FARMING = "Farming",
  SCIENCE = "Science",
  ALCHEMY = "Alchemy",
}
