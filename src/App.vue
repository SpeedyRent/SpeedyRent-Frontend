<script setup>

import MainLayout from '@/layouts/main-layout.vue'
import {computed} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const isLoginPage = computed(()=> route.name === 'login' || route.name === '/')

</script>

<template>
  <div v-if="!isLoginPage">
    <MainLayout />
    <p>PARTE 1</p>
  </div>
  <div v-else>
    <p>PARTE 2</p>
    <router-view/>
  </div>
</template>

<style scoped>

</style>
