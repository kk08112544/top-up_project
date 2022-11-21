<script setup>
import { textRule, numberRule } from "../../utils/validate-rules";
import { ref } from "vue";

const props = defineProps({
  item: Object,
});
const emit = defineEmits(["onAddPackage,onDeletePackage"]);
const isShowCreatePackage = ref(false);
const separator = ref("vertical");
const point = ref();
const unit = ref("");
const price = ref();
const inStock = ref();
const columns = [
  {
    name: "point",
    field: "point",
  },
  {
    name: "unit",
    field: "unit",
  },
  {
    name: "price",
    field: "price",
  },
  {
    name: "inStock",
    field: "inStock",
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
const onCreatePayment = () => {
  const payload = {
    point: parseInt(point.value),
    unit: unit.value,
    price: parseInt(price.value),
    inStock: parseInt(inStock.value),
    status: true,
  };
  emit("onAddPackage", payload);
  isShowCreatePackage.value = false;
};
</script>

<template>
  <div>
    <q-dialog v-model="isShowCreatePackage">
      <q-card class="w-full max-w-[600px]">
        <q-form @submit="onCreatePayment">
          <q-card-section>
            <div class="text-h6">Create package</div>
          </q-card-section>
          <q-card-section class="q-pt-none flex flex-col gap-y-5">
            <q-input
              lazy-rules
              :rules="[(val) => numberRule(val) || 'Point should more than 0']"
              label="Point"
              v-model="point"
              outlined
            ></q-input>
            <q-input
              lazy-rules
              :rules="[(val) => textRule(val) || 'Please enter detail']"
              label="unit"
              v-model="unit"
              outlined
            ></q-input>
            <q-input
              lazy-rules
              :rules="[(val) => numberRule(val) || 'Price should more than 0']"
              label="price"
              v-model="price"
              outlined
            ></q-input>
            <q-input
              lazy-rules
              :rules="[
                (val) =>
                  numberRule(val) || 'Package should more than 0 in stock',
              ]"
              label="in stock"
              v-model="inStock"
              outlined
            ></q-input>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              type="submit"
              flat
              label="Create Package"
              color="primary"
            /> </q-card-actions
        ></q-form>
      </q-card>
    </q-dialog>
    <div class="flex w-full gap-x-3 items-end mb-5">
      <div class="text-[30px] font-medium">Package</div>
      <q-space />
      <q-btn
        class="text-white  cursor-pointer bg"
        label="Add Package"
        @click="isShowCreatePackage = true"
        no-caps
      ></q-btn>
    </div>
    <q-table
      :rows="item.package"
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
          <q-td key="point" :props="props" style="text-align: left">
            <div class="text-[16px] font-light py-2 text-center">
              <q-input outlined class="w-full" v-model="props.row.point" />
            </div>
          </q-td>
          <q-td key="unit" :props="props" style="text-align: left">
            <q-input outlined class="w-full" v-model="props.row.unit"></q-input>
          </q-td>
          <q-td key="price" :props="props" style="text-align: left">
            <q-input
              outlined
              class="w-full"
              v-model="props.row.price"
            ></q-input>
          </q-td>
          <q-td key="inStock" :props="props" style="text-align: left">
            <q-input
              outlined
              class="w-full"
              v-model="props.row.inStock"
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
                $emit('onDeletePackage', {
                  packages: props.row,
                  name: item.name,
                  index: props.rowIndex,
                })
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
</template>
