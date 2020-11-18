<template>
  <button class="app-fab mdc-ripple-surface" :class="{ 'app-fab--extended': text, 'app-fab--mini': mini && !text }">
    <i class="material-icons" :class="{ pr: text }" @click="$emit('click')">{{ icon }}</i>
    <label v-if="text">{{ text }}</label>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    mini: {
      type: Boolean,
      required: false,
      default: false
    }
  }
});
</script>

<style scoped>
.app-fab {
  position: fixed;
  bottom: 16px;
  right: 16px;
  height: 56px;
  padding: 16px;
  border: none;
  border-radius: 50%;
  background-color: var(--secondary-color);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  /* box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12); */
  outline: none;
}

.app-fab:hover {
  cursor: pointer;
}

.app-fab--mini {
  height: 40px;
  padding: 8px;
}

.app-fab--extended {
  border-radius: 30px;
  height: 48px;
  padding-left: 12px;
  padding-right: 20px;
}
</style>
