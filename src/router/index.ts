// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/Mainlayout.vue"; // Make sure casing matches your file
import Login from "@/pages/Login.vue";
import Signup from "@/pages/Signup.vue";
import Home from "@/pages/Home.vue";
import NotFound from "@/pages/404.vue";
import UploadVideo from "@/pages/UploadVideo.vue";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "signup", name: "Signup", component: Signup },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "Home", component: Home },
      { path: "/upload", name: "Upload", component: UploadVideo }
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
