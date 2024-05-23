/* eslint-disable import/order */
import "@/@fake-db/db";
import "@/@iconify/icons-bundle";

import App from "@/App.vue";

import i18n from "@/plugins/i18n";
import layoutsPlugin from "@/plugins/layouts";
import vuetify from "@/plugins/vuetify";

import type { Router } from "vue-router";
import router from "@/router";

import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "@/apollo-config";

import { abilitiesPlugin } from "@casl/vue";
import { MongoAbility } from "@casl/ability";
import ability from "@/plugins/casl/abilities";

import { loadFonts } from "@/plugins/webfontloader";

import { createApp, provide, h } from "vue";

import "@core/scss/template/index.scss";
import "./style.css";

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
    ability: MongoAbility;
  }
}

loadFonts();

// Create vue app
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
pinia.use(({ store }) => {
  store.router = markRaw(router);
  store.ability = markRaw(ability);
});

// Use plugins
app.use(vuetify);
app.use(pinia);
app.use(router);
app.use(layoutsPlugin);
app.use(i18n);

// Mount vue app
app.mount("#app");
