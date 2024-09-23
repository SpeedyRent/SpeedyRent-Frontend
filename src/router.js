import PersonRents from '@/contexts/learning/components/person-rents.vue'
import TableRents from '@/contexts/learning/components/table-rents.vue'
import TheHome from '@/contexts/shared/pages/the-home.page.vue'
import NotFound from '@/contexts/shared/pages/not-found.page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', component: TheHome },
  {path: '/myNotifications', component: PersonRents },
  {path: '/details', component: TableRents },
  {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router