<template>
  <div class="workouts" :class="{ 'workouts--no-scroll': showModal }">
    <app-workout :workout="myWorkout" />
    <app-workout :workout="myWorkout" />
    <app-workout :workout="myWorkout" />
    <app-workout :workout="myWorkout" />
    <app-workout :workout="myWorkout" />
    <app-workout :workout="myWorkout" />
    <app-workout :workout="myWorkout" />
    <app-workout :workout="myWorkout" />
    <app-fab icon="add" @click="handleCreate" />
    <app-fs-modal
      :show="showModal"
      label="New Workout"
      primaryActionLabel="Save"
      @close="handleCloseModal"
      @primary-action="handleSaveNewWorkout"
    ></app-fs-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppWorkout from "../components/AppWorkout.vue";
import AppFAB from "../components/AppFAB.vue";
import AppFullScreenModal from "../components/AppFullscreenModal.vue";
import { Workout } from "../store/types";

export default Vue.extend({
  data() {
    return {
      myWorkout: {
        name: "My Workout" as string,
        exercises: [
          {
            name: "Bench Press",
            muscleGroups: ["Chest", "Triceps"]
          },
          {
            name: "Deadlift",
            muscleGroups: ["Gluteus", "Quadriceps", "Hamstrings", "Adductor", "Erector Spinae"]
          },
          { name: "Lat-Pulldown", muscleGroups: ["Lat"] },
          { name: "Push-Ups", muscleGroups: ["Chest", "Triceps"] }
        ],
        lastTraining: {
          startDate: new Date(),
          endDate: new Date(),
          duration: 6000
        }
      } as Workout,
      showModal: false as boolean
    };
  },
  methods: {
    handleCreate() {
      console.log("Create new workout");
      this.showModal = true;
    },
    handleCloseModal() {
      // TODO: reset local form data
      this.showModal = false;
    },
    handleSaveNewWorkout() {
      // TODO: handle saving local form data
      this.handleCloseModal();
    }
  },
  components: {
    appWorkout: AppWorkout,
    appFab: AppFAB,
    appFsModal: AppFullScreenModal
  }
});
</script>

<style scoped>
.workouts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.workouts--no-scroll {
  position: fixed;
  overflow-y: hidden;
  height: 100vh;
}
</style>
