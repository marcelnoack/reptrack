<template>
  <div class="workout">
    <div class="workout__header">
      <h4>{{ workout.name }}</h4>
      <button class="material-btn">
        <i class="material-icons md-light btn">more_vert</i>
      </button>
    </div>
    <div class="workout__training-info">
      <p>Last Training: {{ new Date(workout.lastTraining.startDate).toLocaleDateString() }}</p>
      <p>Duration: {{ workout.lastTraining.duration / 60 }} min</p>
    </div>
    <div class="workout__muscles">
      <app-tag v-for="muscleGroup in workoutMuscleGroups" :key="muscleGroup" :name="muscleGroup" icon="run_circle" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Exercise, Workout } from "../store/types";
import AppTag from "./AppTag.vue";

export default Vue.extend({
  props: {
    workout: {
      type: Object as PropType<Workout>,
      required: true
    }
  },
  computed: {
    workoutMuscleGroups(): string[] {
      // flatten the exercise array to extract all muscle groups of all exercises and remove duplicates
      const allMuscleGroups: string[] = this.workout.exercises
        .map((ex) => ex.muscleGroups)
        .reduce((acc, curr) => acc.concat(curr))
        .filter((muscle, index, self) => self.indexOf(muscle) === index);

      return allMuscleGroups;
    }
  },
  components: {
    appTag: AppTag
  }
});
</script>

<style scoped>
.workout {
  width: 85%;
  height: auto;
  padding: 1rem;
  margin: 1rem;
  overflow: hidden;
  border-radius: 10px;
  background-color: var(--primary-color--light);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.workout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.workout__training-info {
  font-size: 0.75rem;
  color: var(--subtle-color);
}

.workout__muscles {
  display: flex;
  flex-wrap: wrap;
}
</style>
