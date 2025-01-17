import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import 'vuetify/dist/vuetify.css'




createApp(App).use(vuetify).mount("#app");
