import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    userList: [
      {
        name: "admin",
        username: "admin",
        password: "qwe123",
        role: "admin",
      },
      {
        name: "suwara001",
        username: "suwara",
        password: "suwara001",
        role: "user",
      },
    ],
    me: {},
  }),
  actions: {
    onSetUser(payload) {
      this.userList.push(payload);
    },
    onLogIn(payload) {
      this.me = payload;
    },
    onLogOut() {
      this.me = {};
    },
  },
  persist: {
    enabled: true,
  },
});
