<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useAuthStore } from "../../stores/auth-store";
import { useCartStore } from "../../stores/cart-store";
import { useHistoryStore } from "../../stores/history-store";
import axios from 'axios';
const historyStore = useHistoryStore();
const cartStore = useCartStore();
const cartList = computed(() => cartStore.cartList);
const authStore = useAuthStore();
const me = computed(() => authStore.me);
const cartModel = ref();
const separator = ref("vertical");
const selectedCart = ref();
const columns = [
  {
    name: "game_name",
    label: "Game name",
  },
  {
    name: "game_id",
    label: "Game ID",
  },
  {
    name: "payment_name",
    label: "Payment",
  },
  {
    name: "package",
    label: "Point",
  },
  {
    name: "package",
    label: "Price",
  },
  {
    name: "manage",
    label: "",
  },
];

const onDelete = (index) => {
  cartModel.value = selectedCart.value.filter(
    (val, i) => i != index && val.user.username == me.value.username
  );
  cartStore.onSetCart(cartModel.value);
};
const onSubmit = (item, index) => {
  axios.post('http://localhost:3000/api/topup/updateCart', {
      "game_name":game_name.value,
      "game_id":game_id.value,
      "payment":payment_name.value,
      "point":point.value,
      "price(baht)":price.value
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  historyStore.onSetHistory(item);
  onDelete(index);
};

watch(
  () => cartList.value,
  () => {
    selectedCart.value = cartList.value;
  }
);

onMounted(() => {
  selectedCart.value = cartList.value.filter(
    (val) => val.user?.username == me.value?.username
  );
  cartModel.value = cartList.value;
});
</script>

<template>
  <q-page>
    <div class="flex w-full">
      <div
      class="w-full bg-[#f9b805] h-[201px] flex items-center justify-center gap-5"
    >
      <q-img src="icons/Layer.png" class="w-[80px] h-[70px]"></q-img>
      <span class="text-[40px] text-black">Check you shopping cart...</span>
    </div>
     <div class="flex-row flex w-full bg-[#B18BEF] h-[70vh] gap-5 p-11 justify-center items-center">
      <div class="px-5 mt-5 w-full">
          <q-table
            :columns="columns"
            :rows="selectedCart"
            :separator="separator"
            v-if="selectedCart"
            row-key="name"
            class="w-full pb-5"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  style="text-align: center"
                >
                  <span class="text-[18px]">{{ col.label }}</span>
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="game_name" :props="props" style="text-align: left">
                  {{ props.row.game_name }}
                </q-td>
                <q-td key="game_id" :props="props" style="text-align: left">
                  {{ props.row.game_id }}
                </q-td>
                <q-td
                  key="payment_name"
                  :props="props"
                  style="text-align: left"
                >
                  {{ props.row.payment_name }}
                </q-td>
                <q-td key="package" :props="props" style="text-align: left">
                  {{ props.row.package?.point }}
                </q-td>
                <q-td key="package" :props="props" style="text-align: left">
                  {{ props.row.package?.price }}
                </q-td>
                <q-td key="manage" :props="props" style="text-align: center">
                  <div class="flex w-full justify-center gap-3">
                    <q-btn
                      label="Delete"
                      no-caps
                      class="text-white bg-red"
                      @click="onDelete(props.rowIndex)"
                    />
                    <q-btn
                      label="Submit"
                      no-caps
                      class="text-white bg-blue"
                      @click="onSubmit(props.row, props.rowIndex)"
                    />
                    <q-checkbox v-model="right" />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
     </div>

  </q-page>
</template>
<!-- <template>
  <q-page>
    <div
      class="w-full bg-[#f9b805] h-[201px] flex items-center justify-center gap-5"
    >
    <q-img src="icons/Layer.png" class="w-[80px] h-[70px]"></q-img>
      <span class="text-[40px] text-black">Check you shopping cart...</span>
    </div>
    <div class="flex-row flex w-full bg-[#B18BEF] h-[80vh] gap-5 p-11 justify-center items-center" >
      <div class="px-4 mt-4
       w-full">
          <q-table
            :columns="columns"
            :rows="selectedCart"
            :separator="separator"
            v-if="selectedCart"
            row-key="name"
            class="w-full pb-4"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  style="text-align: center"
                >
                  <span class="text-[18px]">{{ col.label }}</span>
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="game_name" :props="props" style="text-align: left">
                  {{ props.row.game_name }}
                </q-td>
                <q-td key="game_id" :props="props" style="text-align: left">
                  {{ props.row.game_id }}
                </q-td>
                <q-td
                  key="payment_name"
                  :props="props"
                  style="text-align: left"
                >
                  {{ props.row.payment_name }}
                </q-td>
                <q-td key="package" :props="props" style="text-align: left">
                  {{ props.row.package?.point }}
                </q-td>
                <q-td key="package" :props="props" style="text-align: left">
                  {{ props.row.package?.price }}
                </q-td>
                <q-td key="manage" :props="props" style="text-align: center">
                  <div class="flex w-full justify-center gap-3">
                    <q-btn
                      label="Delete"
                      no-caps
                      class="text-white bg-red"
                      @click="onDelete(props.rowIndex)"
                    />
                    <q-btn
                      label="Submit"
                      no-caps
                      class="text-white bg-blue"
                      @click="onSubmit(props.row, props.rowIndex)"
                    />
                    <q-checkbox v-model="right" />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
  </q-page>
</template> -->

