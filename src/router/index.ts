import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // Home
  {
    path: "/",
    name: "Home",
    redirect: "Login",
  },
  // Login
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/account/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
