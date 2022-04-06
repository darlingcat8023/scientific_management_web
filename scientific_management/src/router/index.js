import Vue from "vue";
import VueRouter from "vue-router";
import index from "@/views/index";
import login from "@/views/login";
import registry from "@/views/registry";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/registry",
    name: "registry",
    component: registry,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;