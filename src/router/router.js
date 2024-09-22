import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/shared/views/login-view.vue'
import NotFoundView from '@/shared/views/not-found-view.vue'
import SingupView from '@/shared/views/singup-view.vue'
import HomeOwnerView from '@/views/owner/home-owner-view.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/singup', component: SingupView },
  { path: '/home-owner', component: HomeOwnerView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
