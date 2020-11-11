import Vue from "vue";
import VueRouter, { RouteConfig, Route, NavigationGuard } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/workouts",
    name: "My Workouts",
    component: () => import("../views/TheWorkouts.vue")
  }
  // { path: "/messages", component: () => import("../views/TheMessages") }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const DEFAULT_DOCUMENT_TITLE = "reptrack";
router.afterEach((to: Route, from: Route) => {
  Vue.nextTick(() => {
    document.title = to.name ? `${to.name} - ${DEFAULT_DOCUMENT_TITLE}` : DEFAULT_DOCUMENT_TITLE;
  });
});

export default router;
