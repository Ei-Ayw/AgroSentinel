import { createRouter, createWebHistory } from "vue-router";
// import { useUserStore } from "@/stores/user";
import MiddlePage from "../views/MiddlePage.vue";
import MultiModalRecognition from "@/views/multimodal/MultiModalRecognition.vue";
export const routes = [
  {
    path: "/login",
    component: () => import("@/views/auth/AuthLogin.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/auth/AuthRegister.vue"),
  },
  {
    path: "/middle-page",
    name: "MiddlePage",
    component: MiddlePage,
  },
  {
    path: "/test",
    component: () => import("@/views/map/cropVue.vue"),
  },
  {
    path: "/test2",
    component: () => import("@/views/map/mapVue.vue"),
  },
  {
    path: "/test1",
    component: () => import("@/components/test1Vue.vue"),
  },
  // {
  //   path: "/login",
  //   // redirect: "/detection/vision",
  //   redirect: "/login",
  // },
  {
    path: "/",
    component: () => import("@/components/HomeVue.vue"),
  },
  {
    path: "/detection",
    children: [
      {
        path: "vision",
        component: () => import("@/views/auth/detection/VisionDetect.vue"),
      },
      {
        path: "history",
        component: () => import("@/views/auth/detection/HistoryRecords.vue"),
      },
    ],
  },
  {
    path: "/multi-modal-recognition",
    name: "MultiModalRecognition",
    component: MultiModalRecognition,
  },
  {
    path: "/federated",
    children: [
      {
        path: "training-status",
        component: () => import("@/views/federated/TrainingStatus.vue"),
        meta: { requiresAdmin: true },
      },
      {
        path: "performance",
        component: () => import("@/views/federated/PerformanceCompare.vue"),
      },
    ],
  },
  {
    path: "/map",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/map/cropVue.vue"),
      },
      {
        path: "grid-details",
        component: () => import("@/views/map/GridDetails.vue"),
      },
    ],
  },
  {
    path: "/knowledge",
    children: [
      {
        path: "upload",
        component: () => import("@/views/knowledge/DataUpload.vue"),
      },
      {
        path: "qa",
        component: () => import("@/views/knowledge/QaInterface.vue"),
      },
      {
        path: "expert-knowledge",
        component: () => import("@/views/knowledge/ExpertKnowledge.vue"),
      },
    ],
  },
  {
    path: "/user",
    children: [
      {
        path: "location",
        component: () => import("@/views/user/LocationManager.vue"),
      },
      {
        path: "settings",
        component: () => import("@/views/user/AccountSettings.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//   router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();
//   if (to.meta.requiresAdmin && userStore.user?.role !== "admin") {
//     next("/login");
//   } else if (
//     to.path !== "/login" &&
//     to.path !== "/register" &&
//     !userStore.token
//   ) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
