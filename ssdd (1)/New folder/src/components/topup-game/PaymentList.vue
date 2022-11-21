<script setup>
import { onMounted, ref } from "vue";
const emit = defineEmits(["onSelectedForm"]);
const selectedPayment = ref();
const onSelectedPayment = (packageName) => {
  selectedPayment.value = packageName;
  emit("onSelectedForm", packageName);
};
const props = defineProps({
  item: Array,
});

onMounted(() => {
  selectedPayment.value = props.item[0].name;
});
</script>

<template>
  <div class="w-full flex gap-x-20 gap-y-10 items-center justify-center my-10">
    <div
      v-for="(item, i) in item"
      :key="i"
      class="cursor-pointer"
      :class="selectedPayment == item.name ? 'opacity-100' : 'opacity-40'"
      @click="onSelectedPayment(item.name)"
    >
      <q-img
        :src="item.image"
        class="w-[130px] h-auto"
        v-if="item.image && item.status"
      ></q-img>
      <div
        v-else-if="item.status"
        class="w-[100px] rounded-md border-4 text-center px-3 py-5"
        :class="
          selectedPayment == item.name
            ? ' bg-gray-500 text-white border-white'
            : ''
        "
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
