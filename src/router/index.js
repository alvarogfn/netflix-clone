import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home-view.vue";
import SignupView from "../views/signup-view.vue";
import LoginView from "../views/login-view.vue";
import SignupDetailsView from "../views/signup-details-view.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
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
      path: "/browse",
      name: "browse",
      component: () => import("../views/browse-view.vue"),
    },
  ],
});

export default router;
