<template>
  <div class="input-list-item" tabindex="-1">
    <input
      class="input-list-item__input"
      type="text"
      placeholder="Exercise"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <button class="input-list-item__btn" title="Muscle Groups">
      <span class="btn__selection-indicator">{{ exercise.muscleGroups.length || 0 }}</span>
      <div class="material-icons md-18">filter_alt</div>
    </button>
    <button
      class="input-list-item__btn input-list-item__btn--red"
      title="Remove Exercise"
      @click="$emit('remove-exercise')"
    >
      <div class="material-icons md-18">remove</div>
    </button>
  </div>
</template>

<script lang="ts">
import { Exercise } from "@/store/types";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    },
    exercise: {
      type: Object as PropType<Exercise>
    }
  }
});
</script>

<style scoped>
.input-list-item {
  position: relative;
  width: 100%;
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 24px 24px;
  grid-template-rows: 24px;
  place-content: center;
  column-gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background-color: var(--primary-color--light);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  outline: none;
}

.input-list-item__input {
  border: none;
  background-color: transparent;
  color: var(--text-on-primary);
  outline: none;
}

.input-list-item__btn {
  position: relative;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border: none;
  background-color: var(--info-color);
  color: var(--text-on-primary);
  border-radius: 8px;
  cursor: pointer;
}

.input-list-item__btn--red {
  background-color: var(--error-color);
}

.btn__selection-indicator {
  position: absolute;
  text-align: center;
  bottom: -5px;
  right: -5px;
  background-color: #f60405;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  font-size: 0.7rem;
  margin: 0;
  padding: 0;
}
</style>
