import { listOfMaps } from "@/data/items/map";
import { Map } from "@/models/item/Map";
import { computed, ref } from "vue";

const isMapOpen = ref(false);
const maps = computed(() => {
  return listOfMaps.value.filter(map => map.unlocked);
})

export const useMap = () => {
  const toggleMap = () => {
    isMapOpen.value = !isMapOpen.value;
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

  const resetMaps = () => {
    maps.value.forEach((map) => {
      map.unlocked = false;
    });
  }

  return {
    activeMap: computed(() => maps.value.find((map) => map.active)),
    isMapOpen,
    maps,
    toggleMap,
    switchMap,
    listOfMaps,
    resetMaps,
  };
};
