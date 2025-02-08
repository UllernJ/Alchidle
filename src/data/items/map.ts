import { Map } from "@/models/item/Map";
import { mdiMap } from "@mdi/js";
import { ref } from "vue";
import { theForgottenCityMonsters, unkownTempleMonsters } from "./mapMonsters";

export const fifthMap = ref(
  new Map(
    "The unknown temple",
    "Unlocks the ability to explore the fifth map.",
    { path: mdiMap, color: "blue" },
    unkownTempleMonsters
  )
);

export const tenthMap = ref(
    new Map(
        "The forgotten city",
        "Unlocks the ability to explore the tenth map.",
        { path: mdiMap, color: "green" },
        theForgottenCityMonsters
    )
);


export const listOfMaps = ref<Map[]>([fifthMap.value, tenthMap.value]);
