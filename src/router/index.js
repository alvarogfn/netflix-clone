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
    // {
    //   path: "/about",
    //   name: "about",
    //   route level code-splitting
    //   this generates a separate chunk (About.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
