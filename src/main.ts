import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.css";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).mount("#app");
