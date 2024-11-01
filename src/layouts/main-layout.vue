<script setup>
import TheHeader from '@/layouts/the-header.vue'
</script>

<template>
  <div class="layout" >
    <TheHeader />
    <div class="main-content">
      <main class="content">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<style scoped>

.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.main-content {
  width: 100%;
  display: flex;
  flex: 1;
}
.content{
  display: flex;
  flex: 1;
  padding: 5px;
  flex-wrap: wrap;
  gap: 5vh;
  justify-content: center;
  align-content: center;
  background-color: white;
}
</style>