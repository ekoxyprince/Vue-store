/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "@/stores";
import router from "@/router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import AnimateOnScroll from "primevue/animateonscroll";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(PrimeVue, {
      theme: {
        preset: Aura,
      },
    })
    .use(VueQueryPlugin, { queryClient })
    .directive("animateonscroll", AnimateOnScroll);
}
