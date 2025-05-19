import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUserInfo(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user-store",
        storage: localStorage,
      },
    ],
  },
});
