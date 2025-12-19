import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { vuetify } from "./plugins/vuetify";
import router from "./router";
import '@mdi/font/css/materialdesignicons.css'
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

createApp(App).use(vuetify).use(VueQueryPlugin).use(createPinia()).use(router).mount("#app");
