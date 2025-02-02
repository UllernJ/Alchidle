import { Item } from "@/models/item/Item";
import { Map } from "@/models/item/Map";
import { mdiMap } from "@mdi/js";
import { ref } from "vue";

export const fifthMap = ref(
  new Map(
    "Fifth Map",
    "Unlocks the ability to explore the fifth map.",
    { path: mdiMap, color: "blue" },
    5
  )
);

export const tenthMap = ref(
    new Map(
        "Tenth Map",
        "Unlocks the ability to explore the tenth map.",
        { path: mdiMap, color: "green" },
        10
    )
);


export const items = ref<Item[]>([fifthMap.value, tenthMap.value]);
