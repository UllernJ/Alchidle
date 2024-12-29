export type WorkerStation = {
  name: "WORKER_A" | "WORKER_B";
  rate: number;
  numberOfWorkers: number;
  cost: number;
  resource?: RESOURCE
};

export enum RESOURCE {
  WOODCUTTING,
  MINING,
  FARMING,
  SCIENCE,
  ALCHEMY
}
