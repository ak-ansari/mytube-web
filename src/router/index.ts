import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/Mainlayout.vue";
import Home from "@/pages/Home.vue";
import NotFound from "@/pages/404.vue";
import { isAuthenticated, login, register } from "@/auth/keycloak";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    /** collapse the side drawer by default (watch page) */
    immersive?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "results", name: "Results", component: () => import("@/pages/Results.vue") },
      { path: "watch/:videoId", name: "Watch", component: () => import("@/pages/Watch.vue"), meta: { immersive: true } },
      { path: "channel/:channelId", name: "Channel", component: () => import("@/pages/Channel.vue") },
      { path: "subscriptions", name: "Subscriptions", component: () => import("@/pages/Subscriptions.vue"), meta: { requiresAuth: true } },
      { path: "liked", name: "Liked", component: () => import("@/pages/Liked.vue"), meta: { requiresAuth: true } },
      { path: "studio", name: "Studio", component: () => import("@/pages/Studio.vue"), meta: { requiresAuth: true } },
      { path: "upload", name: "Upload", component: () => import("@/pages/UploadVideo.vue"), meta: { requiresAuth: true } },
      { path: ":pathMatch(.*)*", name: "NotFound", component: NotFound },
    ],
  },
  // Keycloak hosts the login and registration screens
  { path: "/auth/login", redirect: "/", beforeEnter: () => { login("/"); return false; } },
  { path: "/auth/signup", redirect: "/", beforeEnter: () => { register("/"); return false; } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (_to, _from, saved) => saved ?? { top: 0 },
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    login(to.fullPath);
    return false;
  }
});

export default router;
