<script setup>
import { onMounted, watch, ref } from "vue";
import { useGameStore } from "../../stores/game-store";
import { textRule } from "../../utils/validate-rules";

const emit = defineEmits(["onSelectedGame"]);
const props = defineProps({
  gameList: Array,
});
const gameStore = useGameStore();
const isShowCreateGame = ref();
const selectedName = ref();
const gameName = ref();
const onSelectedGame = (name) => {
  selectedName.value = name;
  emit("onSelectedGame", name);
};
const onCreatePayment = () => {
  const payload = {
    name: gameName.value,
    payment: [
      {
        name: "TrueMoney",
        image: "images/payments/true.png",
        detail: "123-456-789",
        status: true,
      },
      {
        name: "PayPal",
        image: "images/payments/paypal.png",
        detail: "123-456-789",
        status: true,
      },
      {
        name: "CreditCard",
        image: "images/payments/credit.png",
        detail: "123-456-789",
        status: true,
      },
      {
        name: "PromptPay",
        image: "images/payments/prompt-pay.png",
        detail: "123-456-789",
        status: true,
      },
    ],
    package: [],
  };
  isShowCreateGame.value = false;
  gameStore.onCreateGame(payload);
};
const onDeleteGame = (name) => {
  gameStore.onDeleteGame(name);
  selectedName.value = props.gameList[0].name;
  emit("onSelectedGame", props.gameList[0].name);
};
onMounted(() => {
  selectedName.value = props.gameList[0].name;
  emit("onSelectedGame", props.gameList[0].name);
});
</script>

<template>
  <div>
    <q-dialog v-model="isShowCreateGame">
      <q-card class="w-full max-w-[600px]">
        <q-form @submit="onCreatePayment">
          <q-card-section>
            <div class="text-h6">Create Game</div>
          </q-card-section>
          <q-card-section class="q-pt-none flex flex-col gap-y-5">
            <q-input
              label="Game name"
              lazy-rules
              :rules="[(val) => textRule(val) || 'Please enter game name']"
              v-model="gameName"
              outlined
            ></q-input>
            <q-file color="purple-12" v-model="model" label="Game Image">
               <template v-slot:prepend>
                 <q-icon name="attach_file" />
               </template>
            </q-file>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              type="submit"
              flat
              label="Create"
              color="primary"
            /> </q-card-actions
        ></q-form>
      </q-card>
    </q-dialog>
    <div class="flex w-full gap-x-3 items-end mb-5">
      <div class="text-[30px] font-medium">Game</div>
      <q-space />
      <q-btn
        class="text-white  cursor-pointer bg"
        bg
        label="Add Game"
        @click="isShowCreateGame = true"
        no-caps
      ></q-btn>
    </div>
    <div class="flex flex-row justify-around mx-auto w-full">
      <div v-for="(item, i) in gameList" :key="i" class="mb-2 relative">
        <q-img
          v-if="item.img_url"
          class="w-[300px] h-[250px] opacity-50 hover:opacity-100 transition-all rounded-md cursor-pointer"
          :src="item.img_url"
          :class="item.name == selectedName ? 'opacity-100' : ''"
          @click="onSelectedGame(item.name)"
        ></q-img>
        <div
          class="text-[50px] border-4 flex flex-center text-center leading-[50px] w-[300px] h-[250px] opacity-50 hover:opacity-100 transition-all rounded-md cursor-pointer"
          @click="onSelectedGame(item.name)"
          :class="
            item.name == selectedName
              ? 'opacity-100 text-white bg-gray-500 border-gray-500 '
              : ''
          "
          v-else
        >
          {{ item.name }}
        </div>
        <div
          v-if="item.name == selectedName"
          class="absolute p-3 bg-white top-0 right-0 rounded-sm hover:bg-white cursor-pointer border-2"
          @click="onDeleteGame(item.name)"
        >
          <q-icon
            name="delete"
            class="text-[#6b6b6b] text-[20px] hover:text-[#ff6262]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.bg{
  background: linear-gradient(90deg, #6549D5 2.49%, rgba(227, 63, 161, 0.91) 45.31%, #FB5343 100%);
 }
</style>
