import { ref } from "vue";

const money = ref<number>(0);
const maxMoney = ref<number>(200);

export const useResource = () => {
  const addMoney = (amount: number) => {
    if((money.value + amount) > maxMoney.value ) {
      money.value = maxMoney.value
    } else {
      money.value += amount;
    }
  };

  const substractMoney = (amount: number) => {
      money.value -= amount;
  };

  const buyStorage = () => {
    maxMoney.value *= 2;
  };

  return { money, maxMoney, addMoney, buyStorage, substractMoney };
};
