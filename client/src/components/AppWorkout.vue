<template>
  <div class="workout">
    <div class="workout__header">
      <h4>{{ workout.name }}</h4>
      <button class="material-btn">
        <i class="material-icons md-light btn">more_vert</i>
      </button>
    </div>
    <div class="workout__content">
      <p>Last Training: {{ new Date(workout.lastTraining.startDate).toLocaleDateString() }}</p>
      <p>Duration: {{ workout.lastTraining.duration / 60 }} min</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Workout } from "../store/types";

export default Vue.extend({
  props: {
    workout: {
      type: Object as PropType<Workout>,
      required: true
    }
  }
});
</script>

<style scoped>
.workout {
  width: 85%;
  height: auto;
  overflow: hidden;
  border-radius: 10px;
  background-color: var(--primary-color--light);
  padding: 1rem;
  margin: 0.5rem;
}

.workout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.workout__content {
}
</style>
