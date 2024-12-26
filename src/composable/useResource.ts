import { ref } from "vue";

const money = ref<number>(0);

export const useResource = () => {
  return { money };
};
