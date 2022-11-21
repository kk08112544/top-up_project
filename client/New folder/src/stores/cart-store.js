import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartList: [],
  }),
  actions: {
    onCreateCart(payload) {
      this.cartList.unshift(payload);
    },
    onSetCart(payload) {
      this.cartList = payload;
    },
  },
  persist: {
    enabled: true,
  },
});
