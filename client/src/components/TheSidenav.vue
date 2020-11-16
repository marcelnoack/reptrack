<template>
  <div class="sidenav">
    <header class="sidenav__header">
      <h3>Logo_Placeholder</h3>
    </header>
    <div class="sidenav__nav">
      <app-menu :items="navItems" />
    </div>
    <footer class="sidenav__footer">
      <button class="material-btn">
        <i class="material-icons btn secondary">settings</i>
      </button>
      <div class="material-btn">
        <i class="material-icons btn secondary">brightness_4</i>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppMenu from "./AppMenu.vue";
import { MenuItem } from "./AppMenuItem.vue";

export default Vue.extend({
  data() {
    return {
      navItems: [
        {
          name: "My Workouts",
          icon: "favorite",
          path: "/workouts"
        },
        {
          name: "Messages",
          icon: "chat",
          path: "/chat"
        }
      ] as Array<MenuItem>
    };
  },
  components: {
    appMenu: AppMenu
  }
});
</script>

<style scoped>
.sidenav {
  position: relative;
  width: 100%;
  height: 100%;
}

.sidenav__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.sidenav__nav {
}

.sidenav__footer {
  position: absolute;
  width: 100%;
  padding: 0.5rem 1.5rem;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
