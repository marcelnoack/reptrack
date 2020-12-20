<template>
  <div class="layout-container" :class="{ 'layout-container--nav-show': showNav }">
    <nav
      class="layout-container__nav"
      :class="{
        'layout-container__nav--show': showNav
      }"
    >
      <the-sidenav></the-sidenav>
    </nav>
    <header class="layout-container__header">
      <app-header :pageTitle="documentTitle" @toggle="toggleNav" />
    </header>
    <main
      class="layout-container__content"
      :class="{
        'layout-container__content--push': showNav
      }"
    >
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "./AppHeader.vue";
import TheSidenav from "./TheSidenav.vue";

export default Vue.extend({
  data() {
    return {
      showNav: false as boolean,
      startX: null,
      diffX: null
    };
  },
  computed: {
    documentTitle() {
      return this.$route.name;
    }
  },
  methods: {
    toggleNav(): void {
      this.showNav = !this.showNav;
    }
  },
  components: {
    theSidenav: TheSidenav,
    appHeader: AppHeader
  }
});
</script>

<style>
.layout-container {
  --header-height: 64px;
  --sidenav-width: 200px;
  display: grid;
  grid-template-rows: var(--header-height) calc(100vh - var(--header-height));
  grid-template-columns: auto;
  grid-template-areas: "header" "content";

  background-color: var(--primary-color);
  color: var(--text-on-primary);
}

/* .layout-container--nav-show {
  grid-template-columns: var(--sidenav-width) auto;
  grid-template-areas:
    "header header"
    "nav content";
} */

.layout-container__nav {
  /* display: none; */
  left: -100%;
  top: 0;
  position: fixed;
  height: 100%;
  width: var(--sidenav-width);
  z-index: 0;
  /* grid-area: nav; */
  background-color: red;
  transition: all 0.5s ease;
}

.layout-container__nav--show {
  left: 0;
  display: initial;
}

.layout-container__header {
  grid-area: header;
  background-color: transparent;
  z-index: 0;
}

.layout-container__content {
  grid-area: content;
  background-color: transparent;
  /* display: flex;
  align-items: center;
  flex-direction: column; */
  overflow-y: auto;
  overflow-x: hidden;
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
