import { MonsterFactory } from "@/factories/MonsterFactory";
import { Monster } from "@/models/Monster";
import Decimal from "break_eternity.js";

export const unkownTempleMonsters: Monster[] = MonsterFactory.getMonsters(
  30,
  new Decimal(3000),
  new Decimal(290),
  new Decimal(300),
  5
);
export const theForgottenCityMonsters: Monster[] = MonsterFactory.getMonsters(
  30,
  new Decimal(500_000),
  new Decimal(50_000),
  new Decimal(10000),
  10
);
