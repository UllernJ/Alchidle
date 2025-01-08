import { ref } from "vue";
import type { MessageType } from "./useMessage";

type Log = {
  timestamp: string;
  message: string;
  logType: MessageType;
};

const log = ref<Log[]>([]);

export const useActionLog = () => {
  const logMessage = (message: string, logType: MessageType) => {
    log.value.push({
      timestamp: new Date().toLocaleTimeString(),
      message,
      logType,
    });
  };

  return {
    log,
    logMessage,
  };
};
