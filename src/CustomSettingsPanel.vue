<script setup lang="ts">
import { reactive, defineProps } from 'vue';
import type { PropType } from 'vue';
import type { AdaptableApi } from '@adaptabletools/adaptable-vue3-aggrid';
import { toRaw } from 'vue';

const props = defineProps({
  adaptableApi: {
    type: Object as PropType<AdaptableApi>,
    required: true,
  },
});

// THEME EDITOR
const variableMap = {
  background: '--ab-cmp-adaptable-popup-topbar__background',
  'popup-background': '--ab-cmp-adaptable-popup__background',
};
const root = document.querySelector(':root') as HTMLElement;
const computedStyle = getComputedStyle(root);
const background = computedStyle
  .getPropertyValue(variableMap['background'])
  .trim();
const popupBackground = computedStyle
  .getPropertyValue(variableMap['popup-background'])
  .trim();

const handleChange = (
  variableName: 'background' | 'popup-background',
  color: string
) => {
  const root = document.querySelector(':root') as HTMLElement;
  if (!root) {
    return;
  }

  root.style.setProperty(variableMap[variableName], color);
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
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 10px;
}
</style>
