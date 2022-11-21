import { defineStore } from "pinia";

export const usePackageStore = defineStore("package", {
  state: () => ({
    packageList: ["True Money", "Credit Card", "PromptPay", "Paypal"],
  }),
  actions: {
    onCreatePayment(payload) {
      this.packageList.push(payload);
    },
  },
  persist: {
    enabled: true,
  },
});
