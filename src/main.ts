import "@mdi/font/css/materialdesignicons.css";
import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import { vuetify } from "./plugins/vuetify";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { useSetupNotification } from "./composables/useSetupNotification";

createApp(App)
  .use(vuetify)
  .use(VueQueryPlugin)
  .use(createPinia())
  .use(router)
  .use(useSetupNotification())
  .mount("#app");
