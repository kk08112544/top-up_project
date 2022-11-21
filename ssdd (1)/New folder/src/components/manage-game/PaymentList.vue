<script setup>
import { ref, computed } from "vue";
import { textRule } from "../../utils/validate-rules";
import { usePackageStore } from "../../stores/package-store";
const emit = defineEmits(["onDelete", "onAddPayment"]);
const props = defineProps({
  item: Object,
});
const packageStore = usePackageStore();
const packageList = computed(() => packageStore.packageList);
const isShowAddDialog = ref(false);
const isShowCreateDialog = ref(false);
const separator = ref("vertical");
const model = ref("");
const createPaymentName = ref();
const detail = ref();
const columns = [
  {
    name: "logo",
    field: "image",
  },
  {
    name: "name",
    field: "name",
  },
  {
    name: "detail",
    field: "detail",
  },
  {
    name: "edit",
    field: "edit",
  },
  {
    name: "status",
    field: "status",
  },
];

// const onCreatePayment = () => {
//   packageStore.onCreatePayment(createPaymentName.value);
// };
// const onAddPayment = () => {
//   const payload = {
//     name: model.value,
//     detail: detail.value,
//     status: true,
//   };
//   emit("onAddPayment", payload);
//   isShowAddDialog.value = false;
// };
</script>

<template>
  <q-dialog v-model="isShowAddDialog">
    <q-card class="w-full max-w-[600px]">
      <q-form @submit="onAddPayment"
        ><q-card-section>
          <div class="text-h6">Add Payment</div>
        </q-card-section>

        <q-card-section class="q-pt-none flex space-y-5 flex-col mt-5">
          <q-select
            outlined
            v-model="model"
            :options="packageList"
            label="Choose package"
            lazy-rules
            :rules="[(val) => textRule(val) || 'Please select package']"
          />
          <q-input
            lazy-rules
            :rules="[(val) => textRule(val) || 'Please enter detail']"
            label="Detail"
            v-model="detail"
            outlined
          ></q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Add Payment"
            color="primary"
            type="submit"
          /> </q-card-actions
      ></q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="isShowCreateDialog">
    <q-card class="w-full max-w-[600px]">
      <q-form @submit="onCreatePayment">
        <q-card-section>
          <div class="text-h6">Create Payment</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="package name"
            v-model="createPaymentName"
            outlined
          ></q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="submit"
            flat
            label="Create Payment"
            color="primary"
            v-close-popup
          /> </q-card-actions
      ></q-form>
    </q-card>
  </q-dialog>
  <div>
    <div class="flex w-full gap-x-3 items-end mb-5">
      <div class="text-[30px] font-medium">Payment</div>
      <q-space />
      <!-- <q-btn
        class="text-blue"
        label="create payment"
        @click="isShowCreateDialog = true"
      ></q-btn>
      <q-btn
        class="text-blue"
        label="Add payment"
        @click="isShowAddDialog = true"
      ></q-btn> -->
    </div>
    <div class="flex flex-row mx-auto gap-x-10 w-full">
      <q-table
        :rows="item.payment"
        :columns="columns"
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
              <span class="text-[18px]">{{ col.name }}</span>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              class="w-1/5"
              key="logo"
              :props="props"
              style="text-align: left"
            >
              <div class="text-[16px] font-light py-2 text-center">
                <q-img
                  :src="props.row.image"
                  class="w-[50px] h-[30px]"
                  v-if="props.row.image"
                ></q-img>
                <div class="" v-else>-</div>
              </div>
            </q-td>
            <q-td
              class="w-1/5"
              key="name"
              :props="props"
              style="text-align: left"
            >
              <div class="text-[16px] font-light py-2">
                {{ props.row.name }}
              </div>
            </q-td>
            <q-td
              class="w-3/5"
              key="detail"
              :props="props"
              style="text-align: left"
            >
              <q-input
                outlined
                class="w-full"
                v-model="props.row.detail"
              ></q-input>
            </q-td>
            <q-td
              class="text-center"
              key="edit"
              :props="props"
              style="text-align: left"
            >
              <q-btn
                @click="
                  $emit('onDelete', { payment: props.row, name: item.name })
                "
                class="bg-red text-white"
                label="Delete"
                no-caps
              ></q-btn>
            </q-td>
            <q-td
              class="text-center"
              key="status"
              :props="props"
              style="text-align: left"
            >
              <q-toggle v-model="props.row.status" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
