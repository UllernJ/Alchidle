export type WorkerStation = {
  name: string;
  rate: number;
  numberOfWorkers: number;
  cost: number;
  resource: RESOURCE;
  description: string;
  icon?: string;
  requirement?: () => boolean;
};

export enum RESOURCE {
  MONEY = "Money",
  MINING = "Mining",
  ALCHEMY = "Alchemy",
  SCIENCE = "Science",
}
