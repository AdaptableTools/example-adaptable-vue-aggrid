<script setup lang="ts">
import { ref } from "vue";
const searchText = ref("");

const emit = defineEmits({
  change: (value: string) => true,
});
const props = defineProps(["counter"]);
</script>

<template>
  <div>
    CUSTOM QuickSearch: {{ props.counter }}
    <input
      :value="searchText"
      style="padding: 6px 10px; marginleft: 5"
      @input="
        (event) => {
          searchText = (event.target as any).value;
          emit('change', (event.target as any).value);
        }
      "
    />
  </div>
</template>
