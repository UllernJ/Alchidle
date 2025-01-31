import { ref } from "vue";

const isInventoryOpen = ref(false);
const inventory = ref([]);

export const useInventory = () => {

  const toggleInventory = () => {
    isInventoryOpen.value = !isInventoryOpen.value;
  }

  return {
    isInventoryOpen,
    inventory,
    toggleInventory
  };
};
