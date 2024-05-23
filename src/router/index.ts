import { setupLayouts } from "virtual:generated-layouts";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { createRouter, createWebHistory } from "vue-router";
import { isUserLoggedIn } from "./utils";
import routes from "~pages";
import { canNavigate } from "@layouts/plugins/casl";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        return { name: "home", query: to.query };
      },
    },
    {
      path: "/allAssets",
      redirect: () => ({
        name: "allAssets",
      }),
    },
    {
      path: "/asset",
      redirect: () => ({
        name: "asset-code",
        params: { code: "" },
      }),
    },
    {
      path: "/users",
      redirect: () => ({
        name: "users",
      }),
    },
    // {
    //   path: "/register",
    //   redirect: () => ({
    //     name: "register",
    //   }),
    // },
    {
      path: "/auditLog",
      redirect: () => ({
        name: "auditLog",
      }),
    },
    ...setupLayouts(routes),
  ],
});

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accessToken");
  const isTokenValid = checkTokenValidity(token);
  const canAccess = canNavigate(to) && isUserLoggedIn();

  if (canAccess && to.meta.redirectIfLoggedIn && isTokenValid)
    next({ name: "home" });
  else if (to.name !== "login" && !canAccess) next({ name: "login" });
  else next();
});

const checkTokenValidity = (token: string | null) => {
  if (!token) return false;

  const decoded = jwtDecode<JwtPayload>(token);
  if (decoded.exp) {
    const now = Date.now() / 1000;
    return decoded.exp > now;
  }

  return false;
};

export default router;
