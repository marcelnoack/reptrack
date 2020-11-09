<template>
  <div class="app-header-container">
    <div class="app-header-container__header-start">
      <button class="app-header__btn">
        <i class="material-icons md-light btn">menu</i>
      </button>
      <p>
        {{ pageTitle }}
      </p>
    </div>
    <div class="app-header-container__header-end">
      <button class="app-header__btn app-header__btn--material-text-only">
        SIGN IN
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    pageTitle: {
      type: String,
      required: false
    }
  }
});
</script>

<style>
.app-header-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.app-header-container__header-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  column-gap: 0.25rem;
  align-items: center;
  font-size: 1.25rem;
}

.app-header-container__header-end {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: none;
  align-items: center;
}

.app-header__btn {
  background-color: transparent;
  border: none;
  color: var(--text-on-primary);
  /* padding: 0.5rem; */
}

.app-header__btn--material-text-only {
  cursor: pointer;
  border-radius: 2.5px;
  padding: 0.25rem;
}

.app-header__btn--material-text-only:hover {
  background-color: var(--primary-color--on-hover);
}
</style>
