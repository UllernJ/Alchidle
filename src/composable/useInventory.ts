import { items } from "@/data/items/map";
import { Item } from "@/models/item/Item";
import { Map } from "@/models/item/Map";
import { computed, ref } from "vue";

const isInventoryOpen = ref(false);
const inventory = ref<Item[]>(items.value);
const maps = computed(() =>
  inventory.value.filter((item) => item instanceof Map)
);

export const useInventory = () => {
  const toggleInventory = () => {
    isInventoryOpen.value = !isInventoryOpen.value;
  };

  const switchMap = (value: Map) => {
    if (value.active) {
      value.exit();
      return;
    }
    value.use();
    maps.value.forEach((map) => {
      if (map.name !== value.name && map.active) {
        map.exit();
      }
    });
  };

  return {
    activeMap: computed(() => maps.value.find((map) => map.active)),
    isInventoryOpen,
    inventory,
    toggleInventory,
    switchMap
  };
};
