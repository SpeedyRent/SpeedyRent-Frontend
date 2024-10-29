import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/contexts/shared/pages/the-home.page.vue'
import NotFound from '@/contexts/shared/pages/not-found.page.vue'
import RequestForm from '@/contexts/learning/components/request/request-form.component.vue'
import RequestTable from '@/contexts/learning/components/request/request-table.component.vue'
import PersonRents from '@/contexts/learning/components/rents/person-rents.vue'
import TableRents from '@/contexts/learning/components/rents/table-rents.vue'
import SearchVehicles from '@/contexts/learning/components/filters/search-vehicles.vue';
import LoginForm from '@/contexts/security/components/login-form.component.vue'
import RegisterForm from '@/contexts/security/components/register-form.component.vue'
import ListVehicle from '@/contexts/learning/components/vehicles/list-vehicle.vue'
import EditVehicle from '@/contexts/learning/components/vehicles/edit-vehicle.vue'
import FormVehicle from '@/contexts/learning/components/vehicles/form-vehicle.vue'
import DetailsVehicle from '@/contexts/learning/components/vehicles/details-vehicle.vue'
import UserProfile from '@/contexts/security/components/user-account.component.vue';

const routes = [
  { path: '/', component: LoginForm , name:'/'},
  { path: '/login', component: LoginForm , name: 'login' },
  { path: '/register', component: RegisterForm , name: 'register' },
  { path: '/home', component: TheHome },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  {path: '/requestForm', component: RequestForm },
  {path: '/requestTable', component: RequestTable },
  {path: '/myNotifications', component: PersonRents },
  {path: '/details', component: TableRents },
  {path: '/searchVehicles', component: SearchVehicles },
  {path: '/ListVehicles', component: ListVehicle, name: 'VehicleList' },
  {path: '/EditVehicle/:id', component: EditVehicle, name: 'EditVehicle', props:true },
  {path: '/AddVehicle', component: FormVehicle, name: 'AddVehicle' },
  {path: '/DetailsVehicle/:id', component: DetailsVehicle, name: 'VehicleDetails',props:true },
  { path: '/profile', component: UserProfile, name: 'UserProfile' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router