import Vue from "vue";
import Router from "vue-router";
const home = () => import("@/components/home");
const create = () => import("@/components/create");

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/create/",
      redirect: "/create/personal"
    },
    {
      path: "/create/:type",
      name: "create",
      component: create
    },
    {
      path: "/*",
      redirect: "/"
    }
  ]
});

router.afterEach((to, from) => {
  console.log(`[Router] Location changed: from ${from.name} to ${to.name}`);
  window.params = {};
  try {
    for (let [k, v] of window.location.href
      .split("?")[1]
      .split("&")
      .map(kv => kv.split("=").map(decodeURIComponent)))
      window.params[k] = v;
  } catch (e) {}
});

export default router;
