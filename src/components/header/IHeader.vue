<template>
  <header class="header">
    <div class="header-title">
      Alchidle
    </div>
    <div class="header-buttons">
      <v-btn
        variant="outlined"
        color="white"
        base-color="grey-darken-1"
        :prepend-icon="mdiContentSave"
        size="large"
        density="compact"
        @click="saveGame"
      >
        Save
      </v-btn>
      <v-btn
        size="large"
        color="white"
        base-color="grey-darken-1"
        variant="outlined"
        :prepend-icon="mdiImport"
        density="compact"
        @click="importGame"
      >
        Import
      </v-btn>
      <v-btn
        size="large"
        color="white"
        base-color="grey-darken-1"
        variant="outlined"
        :prepend-icon="mdiExport"
        density="compact"
        @click="exportGame"
      >
        Export
      </v-btn>
      <v-btn
        :prepend-icon="mdiArrowURightBottomBold"
        size="large"
        variant="outlined"
        color="white"
        base-color="grey-darken-1"
        density="compact"
        @click="resetGame"
      >
        Reset
      </v-btn>
      <v-btn
        variant="outlined"
        color="white"
        base-color="grey-darken-1"
        size="large"
        density="compact"
        :prepend-icon="mdiNewspaper"
        @click="openNews"
      >
        News
      </v-btn>
      <v-btn
        size="large"
        variant="outlined"
        color="white"
        base-color="grey-darken-1"
        density="compact"
        width="10rem"
        @click="openDiscord"
      >
        <v-icon
          left
          class="mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            fill="#fff"
            width="24"
            height="24"
          >
            <path
              d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"
            />
          </svg>
        </v-icon>
        Discord
      </v-btn>
    </div>
  </header>
  <IExport ref="exportModal" />
  <IImport ref="importModal" />
  <INews ref="newsModal" />
  <IReset ref="resetModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { saveSession } from "../../utils/localStorage";
import { mdiArrowURightBottomBold, mdiContentSave, mdiExport, mdiImport, mdiNewspaper } from "@mdi/js";
import IExport from "@/components/header/IExport.vue";
import IImport from "@/components/header/IImport.vue";
import INews from "@/components/header/INews.vue";
import IReset from "@/components/header/IReset.vue";

const exportModal = ref();
const importModal = ref();
const newsModal = ref();
const resetModal = ref();

const saveGame = () => {
  saveSession();
};

const exportGame = () => {
  const state = localStorage.getItem("session");
  if (state && exportModal.value) {
    exportModal.value.open(state);
  }
};

const importGame = () => {
  if (importModal.value) {
    importModal.value.open();
  }
};

const openNews = () => {
  if (newsModal.value) {
    newsModal.value.open();
  }
};

const resetGame = () => {
  if (resetModal.value) {
    resetModal.value.open();
  }
};

const openDiscord = () => {
  window.open("https://discord.gg/dkZkQvzg", "_blank");
};
</script>

<style scoped>
.header {
  max-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2b2b2b;
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
  border-top: 1px solid #f1f1f1;
}

.header-title {
  font-size: 1.25em;
  font-weight: bold;
  color: #ffffff;
}

.header-buttons {
  display: flex;
  gap: 1rem;
}
@media screen and (max-width: 500px) {
  .header-buttons {
    display: none;
  }
}
</style>