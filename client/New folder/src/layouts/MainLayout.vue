<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white py-3">
        <q-btn
          flat
          dense
          round
          icon="menu"
          color="black"
          aria-label="Menu"
          @click="leftDrawerOpen = true"
        />
        <q-toolbar-title>
          <div
            class="text-black text-[22px] cursor-pointer w-fit kk"
            @click="$router.push({ path: '/' })"
          >
            TopUpOnlineGame
            <!-- <q-icon
              name="sports_esports"
              class="text-[30px] ml-2 text-purple"
            ></q-icon> -->
          </div>
        </q-toolbar-title>
        <q-icon
          name="local_mall"
          class="text-[20px] text-black cursor-pointer mx-5"
          v-if="me?.username"
          @click="$router.push({ path: 'user-cart' })"
        />
        <q-btn
          class="text-white  cursor-pointer bg"
          v-if="me?.username"
          @click="onLogOut"
          no-caps
        >
          Log out
        </q-btn>
        <q-btn
          v-else
          class="text-white cursor-pointer bg "
          @click="$router.push({ path: 'sign-in' })"
          no-caps
        >
          Log in
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer :width="375" overlay v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header class="p-0">
          <div class="flex w-full items-center py-5 px-3">
            <div class="text-xl text-black">TopUp Online Game</div>
            <q-icon
              name="sports_esports"
              class="text-[30px] ml-2 text-purple"
            ></q-icon>
            <q-space />
            <div
              class="cursor-pointer"
              @click="leftDrawerOpen = !leftDrawerOpen"
            >
              <q-icon name="menu" class="text-[30px]"></q-icon>
            </div>
          </div>
          <div
            class="px-3 py-2 border-y-2 flex flex-row items-center"
            v-if="me?.username"
          >
            <q-img src="icons/profile.webp" class="w-[50px]"></q-img>
            <div class="flex flex-col ml-5">
              <div>{{ me?.name }}</div>
              <!-- <div>{{ me?.username }} ( {{ me?.role }} )</div> -->
            </div>
            <q-space />
            <q-icon
              name="settings_suggest"
              class="text-[30px] text-blue-300 cursor-pointer hover:text-blue-700"
            ></q-icon>
          </div>
          <q-carousel animated v-model="slide" arrows autoplay infinite>
            <q-carousel-slide :name="1" img-src="icons/yet.png" />
            <q-carousel-slide :name="2" img-src="icons/BestWay.png" />
            <q-carousel-slide :name="3" img-src="icons/Choose.png" />
            <q-carousel-slide :name="4" img-src="icons/Quick.png" />
          </q-carousel>
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "../stores/auth-store";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const me = computed(() => authStore.me);
const leftDrawerOpen = ref(false);
const linksList = ref();
const slide = ref(1);

const onLogOut = () => {
  authStore.onLogIn();
  router.push({ path: "/" });
};
const onSetMenu = () => {
  if (localStorage.getItem("roles") == "admin") {
    linksList.value = [
      {
        title: "Overall",
        caption: "สรุปผล",
        icon: "trending_up",
        path: "/admin",
      },
      {
        title: "Manage",
        caption: "จัดการเกม และ แพ็คเกจ",
        icon: "sports_esports",
        path: "/manage-game",
      },
      // {
      //   title: "Manage Payment",
      //   caption: "จัดการช่องทางการชำระเงิน",
      //   icon: "account_balance_wallet",
      //   path: "https://chat.quasar.dev",
      // },
      {
        title: "Transaction Management",
        caption: "สถานะผู้สั่งซื้อ",
        icon: "manage_accounts",
        path: "/transaction-management",
      },
    ];
  } else {
    linksList.value = [
      {
        title: "Direct top up - Games",
        caption: "เติมเกม",
        icon: "videogame_asset",
        path: "/",
      },
      {
        title: "Direct top up - Cards",
        caption: "ซื้อการ์ด",
        icon: "local_mall",
        path: "https://github.com/quasarframework",
      },
      {
        title: "Transaction history",
        caption: "ประวัติการเติม",
        icon: "history_edu",
        path: "transaction",
      },
    ];
  }

};
watch(
  () => me.value,
  () => {
    onSetMenu();
  }
);
onMounted(() => {
  onSetMenu();
});
</script>
<style>
 .bg{
  background: linear-gradient(90deg, #6549D5 2.49%, rgba(227, 63, 161, 0.91) 45.31%, #FB5343 100%);
 }
 .kk{
  background: radial-gradient(101.55% 2496.66% at 41.38% 35.07%, #FF44CB 0%, #6549D5 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;

text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
 }

 </style>
