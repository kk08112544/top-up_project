<script setup>
import { computed, ref } from "vue";
import GameList from "../../components/manage-game/GameList.vue";
import PaymentList from "../../components/manage-game/PaymentList.vue";
import PackageList from "../../components/manage-game/PackageList.vue";
import { useGameStore } from "../../stores/game-store";
import axios from 'axios';
const gameStore = useGameStore();
const gameList = computed(() => gameStore.gameList);
const gameSelected = ref({
  img_url: "",
  name: "",
  payment: [],
  package: [],
});
const packageSelected = ref({
  img_url: "",
  name: "",
  payment: [],
  package: [],
});

const onSelectedGame = (game_name) => {
  gameSelected.value = gameList.value.find((val) => val.name == game_name);
  packageSelected.value = gameList.value.find((val) => val.name == game_name);
};
const onDelete = ({ payment, name }) => {
  gameSelected.value.payment = gameSelected.value.payment.filter((val, i) => {
    return val.name != payment.name;
  });
  gameStore.onDeletePayment(name, gameSelected.value.payment);
};
const onDeletePackage = ({ packages, name, index }) => {
  packageSelected.value.package = packageSelected.value.package.filter(
    (val, i) => {
      return i != index;
    }
  );
  gameStore.onDeletePackage(name, packageSelected.value.package);
};
const onAddPackage = (payload) => {
  gameStore.onAddPackage(gameSelected.value.name, payload);
};
const onAddPayment = (payload) => {
  gameStore.onAddPayment(gameSelected.value.name, payload);
};
</script>

<template>
  <q-page class="flex w-full">
    <div
      class="flex flex-row justify-center w-full py-[50px] px-[20px] gap-x-10 "
    >
      <div class="w-full flex flex-col gap-y-10">
        <GameList @onSelectedGame="onSelectedGame" :gameList="gameList" />
        <PackageList
          @onAddPackage="onAddPackage"
          @onDeletePackage="onDeletePackage"
          :item="packageSelected"
        />
        <PaymentList
          @onAddPayment="onAddPayment"
          @onDelete="onDelete"
          :item="gameSelected"
        />
      </div>
    </div>
  </q-page>
</template>
