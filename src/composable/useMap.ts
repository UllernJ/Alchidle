import { ref } from "vue";

const showMap = ref<boolean>(false);

export const useMap = () => {
  const toggleMap = () => {
    showMap.value = !showMap.value;
  };

  return {
    showMap,
    toggleMap,
  };
};
