<script setup>
import { ref, computed } from "vue";
import { textRule } from "../../../utils/validate-rules";
import { useAuthStore } from "../../../stores/auth-store";
const authStore = useAuthStore();
const me = computed(() => authStore.me);

const emit = defineEmits(["onSubmit"]);
const id = ref();
const name = ref();
const lastName = ref();

const onSubmit = (type) => {
  const payload = {
    id: id.value,
    name: name.value,
    lastName: lastName.value,
  };
  emit("onSubmit", payload, type);
};
</script>

<template>
  <div class="flex flex-col w-full gap-y-5">
    <q-input
      outlined
      v-model="id"
      label="Enter your email or user ID"
      class="w-full max-w-[700px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter email or user ID']"
    ></q-input>
    <q-input
      outlined
      v-model="name"
      label="Name"
      class="w-full max-w-[700px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter name']"
    ></q-input>
    <q-input
      outlined
      v-model="lastName"
      label="LastName"
      class="w-full max-w-[700px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter lastname']"
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
