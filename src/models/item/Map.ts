import { Item } from "@/models/item/Item";
import type { Monster } from "@/models/Monster";
import Decimal from "break_eternity.js";
import { MonsterFactory } from "@/factories/MonsterFactory";
import { useMonsters } from "@/composable/useMonsters";
import { useActionLog } from "@/composable/useActionLog";
import { MessageType } from "@/composable/useMessage";
import { MONSTER_STATE } from "@/types";
import { useInventory } from "@/composable/useInventory";

export class Map extends Item {
  monsters: Monster[] = [];
  cleared: boolean = false;
  active: boolean = false;

  constructor(
    name: string,
    description: string,
    icon: {
      path: string;
      color: string;
    },
    level?: number
  ) {
    const effect = () => {}; // map has no effect
    if (!level) {
      level = 1;
    }
    super(name, description, icon, effect, level);
  }

  override use() {
    const { logMessage } = useActionLog();
    const { mapMonsters, setState } = useMonsters();
    const { toggleInventory } = useInventory();
    logMessage(
      "You entered the map and encountered some new monsters!",
      MessageType.INFO
    );

    const difficulty = this.level;
    const attack = new Decimal(10).times(difficulty).times(difficulty);
    const health = new Decimal(100).times(difficulty * 3);
    this.monsters = MonsterFactory.getMonsters(5, health, attack, difficulty);
    setState(MONSTER_STATE.MAP);
    toggleInventory();

    mapMonsters.value = this.monsters;
    this.active = true;
  }

  complete() {
    const { setState } = useMonsters();
    if (this.monsters.every((monster) => monster.health.lessThanOrEqualTo(0))) {
      this.cleared = true;
      this.active = false;
      setState(MONSTER_STATE.MONSTERS);
    }
  }

  exit() {
    const { logMessage } = useActionLog();
    const { setState } = useMonsters();
    logMessage("You left the map.", MessageType.INFO);
    this.active = false;
    this.monsters = [];
    setState(MONSTER_STATE.MONSTERS);
  }
  
}
