import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import MiddlewarePlugin from "vue-router-middleware-plugin";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL,
});

Vue.use(MiddlewarePlugin, router);

export default router;
