import type { Monster } from "@/models/Monster";

export enum RESOURCE {
  MONEY = "Money",
  MINING = "Mining",
  SCIENCE = "Science",
}

export enum MONSTER_STATE {
  MONSTERS = "MONSTERS",
  MAP = "MAP",
  IDLE = "IDLE",
}

export interface MonsterState {
  value: Monster[];
  state: MONSTER_STATE;
}


