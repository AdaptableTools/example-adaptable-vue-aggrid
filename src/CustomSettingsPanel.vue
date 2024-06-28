<script setup lang="ts">
import { reactive, defineProps } from "vue";
import type { PropType } from "vue";
import type { AdaptableApi } from "@adaptabletools/adaptable-vue3-aggrid";
import { toRaw } from "vue";

const props = defineProps({
  adaptableApi: {
    type: Object as PropType<AdaptableApi>,
    required: true,
  },
});

// THEME EDITOR
const variableMap = {
  background: "--ab-cmp-adaptable-popup-topbar__background",
  "popup-background": "--ab-cmp-adaptable-popup__background",
};
const root = document.querySelector(":root") as HTMLElement;
const computedStyle = getComputedStyle(root);
const background = computedStyle
  .getPropertyValue(variableMap["background"])
  .trim();
const popupBackground = computedStyle
  .getPropertyValue(variableMap["popup-background"])
  .trim();

const handleChange = (
  variableName: "background" | "popup-background",
  color: string
) => {
  const root = document.querySelector(":root") as HTMLElement;
  if (!root) {
    return;
  }

  root.style.setProperty(variableMap[variableName], color);
};

// ROW ADD

const emptyDataItem = {
  make: "2",
  model: "",
  price: 0,
  date: new Date().toISOString().split("T")[0],
};
const dataItem = reactive({ ...emptyDataItem });
const handleSubmit = (event: any) => {
  event.preventDefault();
  const rowData = { ...toRaw(dataItem), id: Math.random() * 1000 };
  props.adaptableApi.gridApi.addGridData([rowData], { addIndex: 0 });
  Object.assign(dataItem, emptyDataItem);
};
</script>

<template>
  <div>
    <h3>Custom theme variables</h3>
    <label className="customSettingsPanel-label">
      Background
      <input
        @input="
          (event) => {
            handleChange('background', (event.target as any).value);
          }
        "
        :value="background"
        type="color"
      />
    </label>
    <label className="customSettingsPanel-label">
      Popup Background
      <input
        @input="
          (event) => {
            handleChange('popup-background', (event.target as any).value);
          }
        "
        :value="popupBackground"
        type="color"
      />
    </label>
  </div>
  <div>
    <form @submit="handleSubmit">
      <h3>Add data item</h3>
      <label className="customSettingsPanel-label">
        Make
        <input v-model="dataItem.make" name="make" type="text" />
      </label>
      <label className="customSettingsPanel-label">
        Model
        <input v-model="dataItem.model" name="model" type="text" />
      </label>
      <label className="customSettingsPanel-label">
        Price
        <input v-model="dataItem.price" name="price" type="number" />
      </label>
      <label className="customSettingsPanel-label">
        Date manufactured
        <input v-model="dataItem.date" name="date" type="date" />
      </label>
      <button type="submit">Add New</button>
    </form>
  </div>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 10px;
}
</style>
