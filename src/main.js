import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router.js'
import setupPrimeVue from '@/primevue-components.js'

const app = createApp(App)
setupPrimeVue(app)

app.use(router)
app.mount('#app')