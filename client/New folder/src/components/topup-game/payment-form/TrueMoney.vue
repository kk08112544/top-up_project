<script setup>
import { ref, computed } from "vue";
import { textRule } from "../../../utils/validate-rules";
import { useAuthStore } from "../../../stores/auth-store";

const emit = defineEmits(["onSubmit"]);
const mobileNumber = ref();
const otp = ref();
const authStore = useAuthStore();
const me = computed(() => authStore.me);

const onSubmit = (type) => {
  const payload = {
    mobileNumber: mobileNumber.value,
    otp: otp.value,
  };
  emit("onSubmit", payload, type);
};
</script>

<template>
  <div class="flex flex-col w-full gap-y-5">
    <q-input
      outlined
      v-model="mobileNumber"
      label="Mobile number"
      class="w-full max-w-[700px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter mobile number']"
    ></q-input>
    <q-input
      outlined
      v-model="otp"
      label="OTP"
      class="w-full max-w-[500px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter otp']"
    ></q-input>
    <div class="flex w-full justify-end mt-10 gap-x-5">
      <q-btn
        :disable="me?.username ? false : true"
        icon="local_mall"
        class="text-blue py-3 px-5"
        @click="onSubmit('cart')"
      ></q-btn>
      <q-btn
        :disable="me?.username ? false : true"
        label="Submit"
        class="text-blue py-3 px-5"
        @click="onSubmit('submit')"
      ></q-btn>
    </div>
  </div>
</template>
