import { createRouter, createWebHistory } from 'vue-router'
import RequestForm from '@/contexts/learning/components/form/request-form.component.vue'
import RequestTable from '@/contexts/learning/components/form/request-table.component.vue'

const routes = [
  {path: '/', component: RequestForm },
  {path: '/request', component: RequestTable }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router