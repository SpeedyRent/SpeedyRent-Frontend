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
  padding:5px;

}
.main-content {
  width: 100vw;
  display: flex;
  flex: 1;
}
.content{
  display: flex;
  flex: 1;
  padding: 10px; /* Espaciado interno */
  flex-wrap: wrap; /* Ajusta el contenido al tamaño de la pantalla */
  background-color: #f4f4f4; /* Color de fondo */
  gap: 5vh; /* Espaciado entre elementos */
  justify-content: center; /* Centra los elementos */
  align-content: center;
  background-color: white;
}
</style>