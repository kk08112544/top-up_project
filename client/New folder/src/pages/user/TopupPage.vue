<script setup>
import { onMounted, ref, computed, shallowRef, markRaw } from "vue";
import { useGameStore } from "../../stores/game-store";
import { useHistoryStore } from "../../stores/history-store";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import PaymentList from "../../components/topup-game/PaymentList.vue";
import PayPal from "../../components/topup-game/payment-form/PayPal.vue";
import CreditCard from "../../components/topup-game/payment-form/CreditCard.vue";
import TrueMoney from "../../components/topup-game/payment-form/TrueMoney.vue";
import PromptPay from "../../components/topup-game/payment-form/PromptPay.vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "../../stores/auth-store";
import { textRule } from "../../utils/validate-rules";
import { useCartStore } from "../../stores/cart-store";
import axios from 'axios';
const authStore = useAuthStore();
const me = computed(() => authStore.me);
const $q = useQuasar();
const gameStore = useGameStore();
const gameList = computed(() => gameStore.gameList);
const selectedGame = ref();
const router = useRouter();
const route = useRoute();
const isActive = ref();
const selectedPackage = ref();
const detail = ref();
const id = ref();
const historyStore = useHistoryStore();
const cartStore = useCartStore();
const isCase = ref();
const confirm = ref(false);
const paymentName = ref();
const setting_menu = [
  { label: "TrueMoney", value: TrueMoney },
  { label: "PayPal", value: PayPal },
  { label: "CreditCard", value: CreditCard },
  { label: "PromptPay", value: PromptPay },
];
const formRef = ref();
const componentName = shallowRef();

const componentSelected = (val) => {
  componentName.value = markRaw(val.value);
};
const onSelectedFormByName = (val) => {
  axios.
  paymentName.value = val;
  const payload = setting_menu.find((data) => data.label == val);
  componentSelected(payload);
};

const onSelectedPackage = (packages, i) => {
  selectedPackage.value = packages;
  isActive.value = i;
};
const onSubmit = async (data, type) => {
  // const isValid = await formRef.value.validate();
  // console.log(isValid);
  // if (isValid) {
  isCase.value = type;
  detail.value = {
    game_name: route.query.gameName,
    package: selectedPackage.value,
    game_id: id.value,
    user: me.value,
    date: moment().format("YYYY/MM/DD").toString(),
    payment_name: paymentName.value,
    payment_detail: data,
    status: "pending",
  };
  confirm.value = true;
  // }
};
const onSetHistory = () => {
  if (isCase.value == "submit") {
    historyStore.onSetHistory(detail.value);
    $q.notify({
      message: "Payment success please check on your transaction.",
      color: "green",
    });
  } else {
    cartStore.onCreateCart(detail.value);
    $q.notify({
      message: "Add to cart success please check on your Cart.",
      color: "green",
    });
  }
  confirm.value = false;
  router.push({ path: "/" });
};
onMounted(() => {
  const routes = route.query.gameName;
  selectedGame.value = gameList.value.find((data) => data.name == routes);
  paymentName.value = setting_menu[0].label;
  componentSelected(setting_menu[0]);
});
</script>
<template>
  <q-page>
     <div class="w-full bg-[#f9b805] h-[201px] flex items-center justify-center gap-3">
      <q-img src="icons/game.png" class="w-[80px] h-[80px]"></q-img>
      <span class="text-[50px] text-black">Game Details</span>
     </div>
     <!-- <div class="w-full bg-[#B18BEF] h-[900px] flex items-center justify-center gap-3" v-if="selectedGame">
      <div class=" flex-col flex w-[300px] ">
          <img :src="`images/games/${selectedGame.img_url}`" class="w-full" pt-4  />
          <div class="text-center">{{ selectedGame.name }}</div>

      </div>
     </div> -->
     <div class="flex-row flex w-full bg-[#B18BEF] gap-5 p-11 justify-center items-center" v-if="selectedGame">
       <div class="flex-col flex w-[300px]">
        <img :src="`images/games/${selectedGame.img_url}`" class="w-full"   />
          <div class="text-center">{{ selectedGame.name }}</div>
       </div>
       <div class="flex-col flex flex-1 space-y-5 mb-10">
        <div class="bg-[#FFFFFF] w-full rounded-[30px] px-14 py-8 mb-3">
          <div class="mb-10 my-5">
              <span class="text-[18px] mb-3">Your Game id</span>
               <br/> <br/>
               <q-input
                outlined
                v-model="id"
                class="max-w-[500px] w-full"
                lazy-rules
                :rules="[(val) => textRule(val) || 'Please enter id']" >
               </q-input>
              </div>
        </div>
        <div class="bg-[#FFFFFF] w-full rounded-[30px] px-14 py-8 mb-3">
          <div class="mb-10 my-5">
              <span class="text-[18px] mb-3">Choose your package</span>

            <div v-for="(item, i) in selectedGame.package" :key="i">
              <div
                v-if="item.status"
                class="rounded-full border-4 py-5 px-20 cursor-pointer text-center mb-3 transition-all"
                :class="
                  isActive == i
                    ? 'opacity-100 bg-gray-500 text-white border-white'
                    : 'opacity-70'
                "
                 @click="onSelectedPackage(item, i)"
              >
                <div>{{ item.point }} {{ item.unit }}</div>
                <div>Price {{ item.price }} bath</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-[#FFFFFF] w-full rounded-[30px] px-14 py-8 mb-3">
          <div class="mb-10 my-5">
              <span class="text-[18px] mb-3">Payment</span>
              <PaymentList
              @onSelectedForm="onSelectedFormByName"
              :item="selectedGame.payment"
            />
            <keep-alive class="mt-5">
              <component @onSubmit="onSubmit" :is="componentName"></component>
            </keep-alive>
          </div>
        </div>
       </div>
       </div>
       <q-dialog v-model="confirm" persistent>
      <q-card class="w-full max-w-[300px]">
        <q-card-section class="row items-center text-center">
          <q-icon name="help" color="blue" class="text-[150px] mx-auto" />
          <div class="text-[20px] my-7">Are you sure you want to continue?</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Submit" color="primary" @click="onSetHistory()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <!-- selectedGame.img_url -->
     <!-- <div class="flex-row flex w-full bg-[#B18BEF] h-[1500px] gap-5 p-11 justify-center items-center" v-if="selectedGame">
      <div class=" flex-col flex w-[300px] " v-if="selectedGame?.img_url">
          <img :src="`images/games/${selectedGame.img_url}`" class="w-full"   />
          <div class="text-center">{{ selectedGame.name }}</div>

      </div> -->
      <!-- <div class="flex-col flex flex-1 space-y-5 mb-5">
           <div class="bg-[#FFFFFF] w-full rounded-[30px] px-14 py-8 mb-3">
            <div class="mb-10 my-5">
              <span class="text-[18px] mb-3">Your Game id</span>
               <br/> <br/>
               <q-input
                outlined
                v-model="id"
                class="max-w-[500px] w-full"
                lazy-rules
                :rules="[(val) => textRule(val) || 'Please enter id']" >
               </q-input>
              </div>

           </div>
           <div class="bg-[#FFFFFF] w-full rounded-[30px] px-14 py-8 mb-3">
            <div class="text-[18px] mb-3">Payment</div>
            <PaymentList
              @onSelectedForm="onSelectedFormByName"
              :item="selectedGame.payment"
            />
            <keep-alive class="mt-5">
              <component @onSubmit="onSubmit" :is="componentName"></component>
            </keep-alive></div>
          </div>


          </div>

          <br>

          <q-dialog v-model="confirm" persistent>
      <q-card class="w-full max-w-[300px]">
        <q-card-section class="row items-center text-center">
          <q-icon name="help" color="blue" class="text-[150px] mx-auto" />
          <div class="text-[20px] my-7">Are you sure you want to continue?</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Submit" color="primary" @click="onSetHistory()" />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

  </q-page>

</template>

 <!-- <template>
  <q-page class="p-5">

    <div
      class="w-full bg-[#f9b805] h-[201px] flex items-center justify-center gap-5"
      v-if="selectedGame"
    >
     <div>
       <q-img src="icons/game.png" class="w-[80px] h-[80px]"></q-img>
        <span class="text-[50px] text-black">Game Details</span>
     </div>
      <div class="flex text-center max-w-[400px] w-full mb-5">
        <div class="w-full flex flex-col" v-if="selectedGame?.img_url">
          <img :src="selectedGame.img_url" class="w-full" />
          <div>{{ selectedGame.name }}</div>
        </div>
        <div
          class="w-full h-[200px] flex flex-center rounded-md border-4 text-[24px] text-white bg-gray-500 border-gray-500 '"
          v-else
        >
          {{ selectedGame.name }}
        </div>
      </div>
      <div class="flex flex-col flex-1 w-full rounded-sm border-2 p-3 gap-y-7">
        <div class="flex w-full">
          <div class="text-[18px] mb-3">Choose your package</div>
           <div class="flex w-full justify-around">
            <div v-for="(item, i) in selectedGame.package" :key="i">
              <div
                v-if="item.status"
                class="rounded-full border-4 py-5 px-20 cursor-pointer text-center mb-3 transition-all"
                :class="
                  isActive == i
                    ? 'opacity-100 bg-gray-500 text-white border-white'
                    : 'opacity-70'
                "
                @click="onSelectedPackage(item, i)"
              >
                <div>{{ item.point }} {{ item.unit }}</div>
                <div>Price {{ item.price }} bath</div>
              </div>
            </div>
          </div>
        </div>
        <q-form ref="formRef">
          <div class="mb-10">
            <div class="text-[18px] mb-3">Your Game id</div>
            <q-input
              outlined
              v-model="id"
              class="max-w-[500px] w-full"
              lazy-rules
              :rules="[(val) => textRule(val) || 'Please enter id']"
            ></q-input>
          </div>

          <div>
            <div class="text-[18px] mb-3">Payment</div>
            <PaymentList
              @onSelectedForm="onSelectedFormByName"
              :item="selectedGame.payment"
            />
            <keep-alive class="mt-5">
              <component @onSubmit="onSubmit" :is="componentName"></component>
            </keep-alive></div
        ></q-form>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card class="w-full max-w-[300px]">
        <q-card-section class="row items-center text-center">
          <q-icon name="help" color="blue" class="text-[150px] mx-auto" />
          <div class="text-[20px] my-7">Are you sure you want to continue?</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Submit" color="primary" @click="onSetHistory()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template> -->
