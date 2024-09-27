import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "Login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/account/LoginView.vue"),
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "控制台",
      icon: "home",
    },
    children: [
      {
        path: "/console",
        name: "Console",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/console/IndexView.vue"),
      },
    ],
    component: () => import("@/layout/IndexLayout.vue"),
  },
  {
    path: "/news",
    name: "News",
    meta: {
      title: "信息管理",
      icon: "information",
    },
    children: [
      {
        path: "/newsIndex",
        name: "NewsIndex",
        meta: {
          title: "信息列表",
        },
        component: () => import("@/views/news/IndexView.vue"),
      },
      {
        path: "/newsCategory",
        name: "NewsCategory",
        meta: {
          title: "信息分类",
        },
        component: () => import("@/views/news/CategoryView.vue"),
      },
      {
        path: "/newsDetailed",
        name: "NewsDetailed",
        meta: {
          title: "信息详情",
        },
        component: () => import("@/views/news/DetailedView.vue"),
      },
    ],
    component: () => import("@/layout/IndexLayout.vue"),
  },
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "user",
    },
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          title: "用户列表",
        },
        component: () => import("@/views/user/IndexView.vue"),
      },
    ],
    component: () => import("@/layout/IndexLayout.vue"),
  },
  {
    path: "/practice_buy",
    component: () => import("@/views/practice/BuyView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
