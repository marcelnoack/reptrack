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
    >
      <div class="new-workout">
        <app-input v-model="newWorkout.name" background="transparent" :maxLength="20" label="Name" />
        <div class="new-workout__workout-exercises">
          <app-input-list-item
            v-for="(exercise, i) in newWorkout.exercises"
            :key="i"
            :exercise="exercise"
            v-model="exercise.name"
            @remove-exercise="removeExerciseFromWorkout(i)"
          />
        </div>
        <app-fab icon="add" text="Add Exercise" @click="addExerciseToNewWorkout" />
      </div>
    </app-fs-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppWorkout from "../components/AppWorkout.vue";
import AppFAB from "../components/AppFAB.vue";
import AppFullScreenModal from "../components/AppFullscreenModal.vue";
import AppInput from "../components/AppInput.vue";
import AppInputListItem from "../components/AppInputListItem.vue";
import { Exercise, Workout } from "../store/types";

export default Vue.extend({
  data() {
    return {
      newWorkout: {
        name: "" as string,
        exercises: [] as Array<Exercise>
      },
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
    },
    addExerciseToNewWorkout() {
      // TODO: handle creating a new exercise instance
      this.newWorkout.exercises.push({
        name: "",
        muscleGroups: []
      });
    },
    removeExerciseFromWorkout(index: number) {
      const localExercises = [...this.newWorkout.exercises];
      console.log(
        localExercises,
        localExercises.filter((e: Exercise, i: number) => i !== index)
      );
      this.newWorkout.exercises = localExercises.filter((e: Exercise, i: number) => i !== index);
      // this.newWorkout.exercises = this.newWorkout.exercises.filter((e: Exercise, i: number) => i !== index);
    }
  },
  components: {
    appWorkout: AppWorkout,
    appFab: AppFAB,
    appFsModal: AppFullScreenModal,
    appInput: AppInput,
    appInputListItem: AppInputListItem
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

.new-workout {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.new-workout__workout-exercises {
  width: 100%;
  margin-top: 2rem;
}
</style>
