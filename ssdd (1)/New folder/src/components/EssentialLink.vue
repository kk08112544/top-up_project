<template>
  <q-item
    :clickable="caption == 'ซื้อการ์ด' ? false : true"
    tag="a"
    class="px-5 py-5"
    :class="caption == 'ซื้อการ์ด' ? 'cursor-not-allowed' : 'cursor-pointer'"
    @click="$router.push({ path: path })"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    path: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
