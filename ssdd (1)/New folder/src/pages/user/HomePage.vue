<template>
  <q-page class="flex w-full">
    <div
      class="flex flex-row justify-center w-full py-[70px] px-[20px] bg-[#F6C209] gap-x-10 items-center h-[700px]"
    >
      <div class="flex-col flex w-full max-w-[500px] flex-wrap-reverse my-10">
        <div class=" ohm text-[40px] ts text-center leading-[45px] mb-5">
          The
          <span class="bs text-[40px]">safe & easy </span>
          <span class="text-[40px]"> way to</span>
          <br>
           buy official game credits
        </div>
        <span class="text-[15px] text-center"
          >easy game recharge just a few steps need this website.</span
        >
      </div>
      <img
        src="images/purple.png"
        class="w-[250px] sm:w-[400px] sm:h-[400px]"
      />
    </div>
    <div class="flex w-full py-36 flex-center text-center bg-[#B18BEF]">
      <div class="max-w-screen-2xl">
        <div class="text-[50px] leading-[60px] mb-20">DIRECT TOP-UP GAMES</div>
        <div class="flex flex-row justify-around gap-x-5 w-full">
          <div v-for="(item, i) in gameList" :key="i" class="mb-10 relative">

            <q-img
              v-if="item.img_url"
              class="w-[300px] h-[250px] opacity-70 hover:opacity-100 transition-all rounded-md cursor-pointer"

              :src="`images/games/${item.img_url}`"
              @click="onPushPage(item.name)"
            ></q-img>
            <div
              class="text-[50px] bg-white border-4 flex flex-center leading-[50px] w-[300px] h-[250px] opacity-50 hover:opacity-100 transition-all rounded-md cursor-pointer"
              v-else
              @click="onPushPage(item.name)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, ref, onMounted } from 'vue';
import { useGameStore } from "../../stores/game-store";
import axios from 'axios';
// import { onMounted } from 'vue'
const gameStore = useGameStore();
const gameList = computed(() => gameStore.gameList);
const router = useRouter();

onMounted(() => {
 console.log("response");
 axios.get('http://localhost:3000/api/file/game'
 )
        .then(function (response) {
          console.log(response.data.result);
          gameStore.gameList=response.data.result;
        })
        .catch(function (error) {
          console.log(error);
        });
});

const onPushPage = (name) => {
  router.push({ path: "top-up", query: { gameName: name } });
};
</script>
<style>
.bs{
  background: radial-gradient(101.55% 2496.66% at 41.38% 35.07%, #5E41D1 0%, #FB5343
 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
}
</style>
