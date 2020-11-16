<template>
  <router-link class="menu__item" tag="div" :to="data.path || ''">
    <div class="item__content">
      <i class="material-icons md-light pr secondary" v-if="data.icon">{{ data.icon }}</i>
      <label>{{ data.name }}</label>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export interface MenuItem {
  icon?: string;
  name: string;
  path: string;
}

export default Vue.extend({
  props: {
    data: {
      type: Object as PropType<MenuItem>,
      required: true
    }
  }
});
</script>

<style scoped>
.menu__item {
  width: 100%;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.5);
}

.menu__item:hover {
  background-color: var(--primary-color--light);
  color: #fff;
  border-left: 5px solid var(--secondary-color);
  padding-left: calc(1.5rem - 5px);
  cursor: pointer;
}

.router-link-active {
  background-color: var(--primary-color--light);
  color: var(--secondary-color);
  border-left: 5px solid var(--secondary-color);
  padding-left: calc(1.5rem - 5px);
}

.item__content {
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
