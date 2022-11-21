<template>
  <q-page class="flex w-full h-fit">
    <div class="max-w-screen-2xl mx-auto flex flex-col w-full gap-y-10">
      <q-img
        src="images/wallpaper/wallpaper1.jpg"
        class="h-[250px] sm:h-[500px]"
      >
        <div class="absolute-full text-subtitle2 text-[50px] flex flex-center">
          Over All
        </div>
      </q-img>
      <div class="flex w-full px-10">
        <div class="flex w-full mt-5 justify-around gap-y-5">
          <div
            class="w-full max-w-[300px] border-4 rounded-md p-10 flex text-center flex-center"
          >
            <div>TOP-UP TOTAL :</div>
            <div class="ml-5 text-[40px] font-semibold">{{ all }}</div>
          </div>
          <div
            class="w-full max-w-[300px] border-4 rounded-md p-10 flex text-center flex-center"
          >
            <div>TOP-UP TODAY :</div>
            <div class="ml-5 text-[40px] font-semibold">{{ today }}</div>
          </div>
          <div
            class="w-full max-w-[300px] border-4 rounded-md p-10 flex text-center flex-center"
          >
            <div>PENDING :</div>
            <div class="ml-5 text-[40px] font-semibold">{{ pending }}</div>
          </div>
          <div
            class="w-full max-w-[300px] border-4 rounded-md p-10 flex text-center flex-center"
          >
            <div>REJECTED :</div>
            <div class="ml-5 text-[40px] font-semibold">{{ reject }}</div>
          </div>
        </div>
      </div>
      <div class="flex w-full pb-10 px-10">
        <q-table
          :columns="columns"
          :rows="historyList"
          :separator="separator"
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
              <q-td key="status" :props="props" style="text-align: left">
                {{ props.row.status }}
              </q-td>
              <q-td key="game_id" :props="props" style="text-align: left">
                {{ props.row.game_id }}
              </q-td>
              <q-td key="payment_name" :props="props" style="text-align: left">
                {{ props.row.payment_name }}
              </q-td>
              <q-td key="package" :props="props" style="text-align: left">
                {{ props.row.package.point }}
              </q-td>
              <q-td key="date" :props="props" style="text-align: left">
                {{ props.row.date }}
              </q-td>
              <q-td key="package" :props="props" style="text-align: left">
                {{ props.row.package.price }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useHistoryStore } from "../../stores/history-store";
import moment from "moment";
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from 'axios';
const historyStore = useHistoryStore();
const historyList = computed(() => historyStore.historyList);
const pending = ref();
const reject = ref();
const all = ref();
const today = ref();
const toDate = ref(moment().format("YYYY/MM/DD").toString());
const separator = ref("vertical");
const columns = [
  {
    name: "game_name",
    label: "Game name",
  },
  {
    name: "status",
    label: "Status",
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
    name: "date",
    label: "Date",
  },
  {
    name: "package",
    label: "Price",
  },
];
onMounted(() => {
  all.value = historyList.value.length;
  today.value = historyList.value.filter(
    (data) => data.date == toDate.value
  ).length;
  pending.value = historyList.value.filter(
    (data) => data.status == "pending"
  ).length;
  reject.value = historyList.value.filter(
    (data) => data.status == "rejected"
  ).length;
});
</script>
