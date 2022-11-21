import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home-view.vue";
import SignupView from "../views/signup-view.vue";
import LoginView from "../views/login-view.vue";
import SignupDetailsView from "../views/signup-details-view.vue";
import AppView from "../views/app-view.vue";
import { useLoginStore } from "../stores/login";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      beforeEnter: async (to, from, next) => {
        const store = useLoginStore();
        const redirectName = to.redirectedFrom;

        if (store.islogged) return next({ ...redirectName });

        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        if (!email || !password) return next();

        try {
          const isAuth = await store.login(email, password);
          if (isAuth) return next({ ...redirectName });
          return next();
        } catch (e) {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          return next();
        }
      },
      children: [
        {
          name: "home",
          path: "",
          component: SignupView,
        },
        {
          path: "/login",
          name: "login",
          component: LoginView,
        },
      ],
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupDetailsView,
    },
    {
      component: AppView,
      beforeEnter: async (to, from, next) => {
        const store = useLoginStore();

        if (store.islogged) return next();

        next({ name: "home" });
      },
      redirect: { name: "browse" },
      children: [
        {
          path: "/browse",
          name: "browse",
          component: () => import("../views/browse-view.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("../views/profile-view.vue"),
        },
        {
          path: "/watch/:id",
          name: "watch",
          component: () => import("../views/watch-view.vue"),
        },
        {
          path: "/metrics",
          name: "metrics",
          component: () => import("../views/metrics-view.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
