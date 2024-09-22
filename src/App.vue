<script setup>
import RegisterRenter from './components/component.RegisterRenter.vue';  // Import the component here
</script>

<template>
  <main>
    <!-- Render the RegisterRenter component -->
    <RegisterRenter />
  </main>
</template>

<style scoped>
/* Style adjustments if necessary */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
