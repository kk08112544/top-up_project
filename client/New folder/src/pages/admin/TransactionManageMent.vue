<script setup>
import { computed, ref } from "vue";
import { useHistoryStore } from "../../stores/history-store";

const historyStore = useHistoryStore();
const historyList = computed(() => historyStore.historyList);

const separator = ref("vertical");
const options = ref(["pending", "rejected", "complete"]);
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
</script>

<template>
  <q-page>
    <div class="flex w-full">
      <div class="max-w-screen-2xl w-full flex mx-auto gap-y-5">
        <div class="w-full">
          <q-img
            src="images/wallpaper/wallpaper2.jpg"
            class="h-[250px] sm:h-[500px]"
          >
            <div
              class="absolute-full text-subtitle2 text-[50px] flex flex-center text-center leading-[50px]"
            >
              Transaction Management
            </div>
          </q-img>
        </div>
        <div class="w-full px-5 py-5">
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
                  <q-select
                    outlined
                    v-model="props.row.status"
                    :options="options"
                    label="status"
                  />
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
    </div>
  </q-page>
</template>
