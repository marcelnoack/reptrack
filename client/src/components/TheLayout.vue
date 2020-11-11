<template>
  <div class="layout-container">
    <nav class="layout-container__nav">Nav</nav>
    <header class="layout-container__header">
      <app-header :pageTitle="documentTitle" />
    </header>
    <main class="layout-container__content">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "./AppHeader.vue";

export default Vue.extend({
  computed: {
    documentTitle() {
      return this.$route.name;
    }
  },
  components: {
    appHeader: AppHeader
  }
});
</script>

<style>
.layout-container {
  --header-height: 64px;
  display: grid;
  grid-template-rows: var(--header-height) calc(100vh - var(--header-height));
  grid-template-columns: auto;
  grid-template-areas: "header" "content";
  background-color: var(--primary-color);
  color: var(--text-on-primary);
}

.layout-container__nav {
  display: none;
  grid-area: nav;
  background-color: aqua;
}

.layout-container__header {
  grid-area: header;
  background-color: transparent;
  z-index: 1;
}

.layout-container__content {
  grid-area: content;
  background-color: transparent;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  /* justify-content: center; */
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  opacity: 0;
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
