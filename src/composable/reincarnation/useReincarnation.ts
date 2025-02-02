import { ref } from "vue";

const isReincarnationOpen = ref(false);
const isReincarnationUnlocked = ref(false);

export const useReincarnation = () => {

    const openReincarnation = () => {
        isReincarnationOpen.value = true;
    };

    const closeReincarnation = () => {
        isReincarnationOpen.value = false;
    };

    const unlockReincarnation = () => {
        isReincarnationUnlocked.value = true;
    };

    return {
        isReincarnationOpen,
        isReincarnationUnlocked,
        openReincarnation,
        closeReincarnation,
        unlockReincarnation
    };
    
};