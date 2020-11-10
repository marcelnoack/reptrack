<template>
  <div class="workouts-container">
    <app-workout :workout="myWorkout" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppWorkout from "../components/AppWorkout.vue";
import { Workout } from "../store/types";

export default Vue.extend({
  data() {
    return {
      myWorkout: {
        name: "My Workout" as string,
        lastTraining: {
          startDate: new Date(),
          endDate: new Date(),
          duration: 6000
        }
      } as Workout
    };
  },
  components: {
    appWorkout: AppWorkout
  }
});
</script>

<style scoped>
.workouts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
