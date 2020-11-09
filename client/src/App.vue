<template>
  <!-- <div id="app"> -->
  <the-layout></the-layout>
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from "vue";
import TheLayout from "./components/TheLayout.vue";

export default Vue.extend({
  components: {
    theLayout: TheLayout
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
}

:root {
  --primary-color: #31294d;
  --primary-color--light: #3b3363;
  --primary-color--dark: #0c0025;
  --primary-color--on-hover: #5c5279;

  --secondary-color: #1de1cc;
  --secondary-color--light: #6effff;
  --secondary-color--dark: #00ae9b;

  --text-on-primary: #ffffff;
  --text-on-secondary: #000000;
}

:root.light-theme {
}

.material-icons.md-light {
  color: #ffffff;
}

.material-icons.btn {
  cursor: pointer;
  background-color: transparent;
  border-radius: 50%;
  padding: 0.5rem;
}

.material-icons.btn:hover {
  background-color: var(--primary-color--on-hover);
}
</style>
