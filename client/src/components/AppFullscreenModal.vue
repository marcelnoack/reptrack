<template>
  <div class="fullscreen-modal" :class="{ 'fullscreen-modal--show': show }">
    <div class="fullscreen-modal__modal-header">
      <div class="modal-header__start">
        <button class="material-btn" @click="$emit('close')">
          <i class="material-icons md-light btn">
            clear
          </i>
        </button>
        <span>{{ label }}</span>
      </div>
      <div class="modal-header__end">
        <button
          class="material-btn material-btn--text-only"
          :disabled="primaryDisabled"
          @click="$emit('primary-action')"
        >
          {{ primaryActionLabel }}
        </button>
      </div>
    </div>
    <div class="fullscreen-modal__modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: true,
      validator(value: string): boolean {
        return value.length < 20 && value.length > 5;
      }
    },
    primaryActionLabel: {
      type: String,
      required: false
    },
    primaryDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
});
</script>

<style scoped>
.fullscreen-modal {
  position: fixed;
  top: 100%;
  width: 100%;
  min-width: 250px;
  height: 100%;
  overflow: hidden;
  z-index: 9999;
  transition: all 0.5s ease-out;
  background-color: var(--primary-color);
  color: var(--text-on-primary);
}

.fullscreen-modal--show {
  top: 0;
}

.fullscreen-modal__modal-header {
  height: var(--header-height);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.modal-header__start {
  height: var(--header-height);
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.25rem;
  font-weight: 500;
}

.fullscreen-modal__modal-content {
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
}
</style>
