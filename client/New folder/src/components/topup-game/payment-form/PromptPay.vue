<script setup>
import { ref, computed } from "vue";
import { textRule } from "../../../utils/validate-rules";
import { useAuthStore } from "../../../stores/auth-store";
const authStore = useAuthStore();
const me = computed(() => authStore.me);

const emit = defineEmits(["onSubmit"]);
const amount = ref();
const date = ref("2019/02/01");
const time = ref("10:56");

const onSubmit = (type) => {
  const payload = {
    amount: amount.value,
    date: date.value,
    time: time.value,
  };
  emit("onSubmit", payload, type);
};
</script>

<template>
  <div class="flex flex-col w-full gap-y-5">
    <q-input
      outlined
      label="payment date"
      v-model="date"
      mask="date"
      :rules="['date']"
      class="w-full max-w-[700px]"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      outlined
      label="time of payment"
      v-model="time"
      mask="time"
      :rules="['time']"
      class="w-full max-w-[700px]"
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="time">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      outlined
      v-model="amount"
      label="amount"
      class="w-full max-w-[500px]"
      lazy-rules
      :rules="[(val) => textRule(val) || 'Please enter amount']"
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
