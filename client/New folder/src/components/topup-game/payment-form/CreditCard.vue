<script setup>
import { ref, computed } from "vue";
import { textRule } from "../../../utils/validate-rules";
import { useAuthStore } from "../../../stores/auth-store";
const authStore = useAuthStore();
const me = computed(() => authStore.me);

const emit = defineEmits(["onSubmit"]);
const name = ref();
const cardNumber = ref();
const experation = ref();
const cvv = ref();

const onSubmit = (type) => {
  const payload = {
    name: name.value,
    cardNumber: cardNumber.value,
    experation: experation.value,
    cvv: cvv.value,
  };
  emit("onSubmit", payload, type);
};
</script>

<template>
  <div class="flex flex-col w-full gap-y-5">
    <q-input
      outlined
      label="Enter Name on card"
      class="w-full max-w-[700px]"
      v-model="name"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter card name']"
    ></q-input>
    <q-input
      outlined
      v-model="cardNumber"
      label="Card Number"
      class="w-full max-w-[700px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter card number']"
    ></q-input>
    <q-input
      outlined
      v-model="experation"
      label="Experation"
      class="w-full max-w-[500px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter exp']"
    ></q-input>
    <q-input
      outlined
      v-model="cvv"
      label="CVV Code"
      class="w-full max-w-[500px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter cvv']"
    ></q-input>
    <div class="flex w-full justify-end mt-10 gap-x-5">
      <q-btn
        icon="local_mall"
        :disable="me?.username ? false : true"
        class="text-blue py-3 px-5"
        @click="onSubmit('cart')"
      ></q-btn>
      <q-btn
        label="Submit"
        :disable="me?.username ? false : true"
        class="text-blue py-3 px-5"
        @click="onSubmit('submit')"
      ></q-btn>
    </div>
  </div>
</template>
