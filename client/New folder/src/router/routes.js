const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/user/HomePage.vue") },
      { path: "sign-in", component: () => import("pages/user/SignPage.vue") },
      { path: "top-up", component: () => import("pages/user/TopupPage.vue") },
      { path: "user-cart", component: () => import("pages/user/UserCart.vue") },
      {
        path: "transaction",
        component: () => import("pages/user/TransactionHistory.vue"),
      },

    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/HomePage.vue") },
      {
        path: "/manage-game",
        component: () => import("pages/admin/ManageGames.vue"),
      },
      {
        path: "/transaction-management",
        component: () => import("pages/admin/TransactionManageMent.vue"),
      },
    ],
  },
];

export default routes;
