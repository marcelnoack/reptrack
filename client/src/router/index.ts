import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
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

export default router;
