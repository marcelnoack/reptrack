<template>
  <div class="tag-container">
    <i v-if="icon" class="material-icons md-light">{{ icon }}</i>
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    icon: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.tag-container {
  border: 2px solid var(--secondary-color--dark);
  color: #fff;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem 0.25rem 0.25rem 0;
  border-radius: 20px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tag-container > i {
  margin-right: 0.25rem;
}
</style>
