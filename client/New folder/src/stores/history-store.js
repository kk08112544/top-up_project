import { defineStore } from "pinia";

export const useHistoryStore = defineStore("history", {
  state: () => ({
    historyList: [
      {
        user: {
          username: "suwara001",
          email: "suwara001",
          password: "suwara001",
          role: "user",
        },
        game_name: "VALORANT",
        status: "rejected",
        game_id: "lnwza007x",
        payment_name: "TrueMoney",
        date: "2022/10/10",
        package: {
          point: 1000,
          price: 500,
        },
      },
      {
        user: {
          username: "suwara001",
          email: "suwara001",
          password: "suwara001",
          role: "user",
        },
        game_name: "APEX",
        status: "pending",
        game_id: "lnwzaApexz",
        payment_name: "PayPal",
        date: "2022/10/10",
        package: {
          point: 800,
          price: 600,
        },
      },
      {
        user: {
          username: "suwara001",
          email: "suwara001",
          password: "suwara001",
          role: "user",
        },
        game_name: "Genshin Impact",
        status: "pending",
        game_id: "lnwzaGenshin",
        payment_name: "TrueMoney",
        date: "2022/10/10",
        package: {
          point: 700,
          price: 300,
        },
      },
    ],
  }),
  actions: {
    onSetHistory(payload) {
      this.historyList.unshift(payload);
    },
  },
  persist: {
    enabled: true,
  },
});
