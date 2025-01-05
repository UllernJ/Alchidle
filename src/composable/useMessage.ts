import { ref } from "vue";

export enum MessageType {
  SUCCESS = "Success",
  ERROR = "Error",
  WARNING = "Warning",
  INFO = "Info",
}

const showPopup = ref<boolean>(false);
const message = ref<string>("");
const messageType = ref<MessageType>(MessageType.SUCCESS);
const shownMessages = ref<Record<string, boolean>>({});

export const useMessage = () => {
  const setShowPopup = (value: boolean) => {
    showPopup.value = value;
  };

  const setMessage = (value: string) => {
    message.value = value;
  };

  const establishMessage = (type: MessageType, value: string) => {
    setMessage(value);
    setShowPopup(true);
    messageType.value = type;
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const setShownMessage = (key: string, value: boolean) => {
    shownMessages.value[key] = value;
  };

  const hasShownMessage = (key: string) => {
    return shownMessages.value[key] || false;
  };

  return {
    showPopup,
    message,
    messageType,
    establishMessage,
    setShownMessage,
    hasShownMessage,
  };
};
