import { Item } from "@/models/item/Item";
import type { Monster } from "@/models/Monster";
import { useMonsters } from "@/composable/useMonsters";
import { useActionLog } from "@/composable/useActionLog";
import { MessageType } from "@/composable/useMessage";
import { MONSTER_STATE } from "@/types";
import { useMap } from "@/composable/useMap";

export class Map extends Item {
  monsters: Monster[];
  cleared: boolean = false;
  active: boolean = false;

  constructor(
    name: string,
    description: string,
    icon: {
      path: string;
      color: string;
    },
    monsters: Monster[],
    level?: number
  ) {
    const effect = () => {}; // map has no effect
    if (!level) {
      level = 1;
    }
    super(name, description, icon, effect, level);
    this.monsters = monsters;
  }

  override use() {
    const { logMessage } = useActionLog();
    const { mapMonsters, setState } = useMonsters();
    const { toggleMap } = useMap();
    logMessage(
      "You entered the map and encountered some new monsters!",
      MessageType.INFO
    );
    setState(MONSTER_STATE.MAP);
    toggleMap();
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
    setState(MONSTER_STATE.MONSTERS);
  }
  
}
