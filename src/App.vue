<script setup>

import MainLayout from '@/layouts/main-layout.vue'
import {computed} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const isLoginPage = computed(()=> route.name === 'login' || route.name === '/')
const isRegisterPage = computed(()=> route.name === 'register')

</script>

<template>
  <MainLayout v-if="!isLoginPage && !isRegisterPage" />
  <router-view v-else />
</template>

<style scoped>

</style>
