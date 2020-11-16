<template>
  <div class="menu">
    <app-menu-item v-for="item in items" :key="item.name" :data="item" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import AppMenuItem, { MenuItem } from "./AppMenuItem.vue";

export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<Array<MenuItem>>
    }
  },
  components: {
    appMenuItem: AppMenuItem
  }
});
</script>

<style scoped>
.menu {
  width: 100%;
  height: 100%;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
