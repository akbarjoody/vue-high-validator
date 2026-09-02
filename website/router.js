import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Guide from "./pages/Guide.vue";
import Validators from "./pages/Validators.vue";
import Locale from "./pages/Locale.vue";
import Api from "./pages/Api.vue";
import Playground from "./pages/Playground.vue";

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: "/", component: Home },
    { path: "/guide", component: Guide },
    { path: "/validators", component: Validators },
    { path: "/locale", component: Locale },
    { path: "/api", component: Api },
    { path: "/playground", component: Playground },
  ],
});
