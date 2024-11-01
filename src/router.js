import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/contexts/shared/pages/the-home.page.vue'
import NotFound from '@/contexts/shared/pages/not-found.page.vue'
import RequestForm from '@/contexts/rentals/components/request/request-form.component.vue'
import RequestTable from '@/contexts/rentals/components/request/request-table.component.vue'
import PersonRents from '@/contexts/rentals/components/rents/rents-person.component.vue'
import TableRents from '@/contexts/rentals/components/rents/rents-table.component.vue'
import FiltersVehicles from '@/contexts/rentals/components/filters/filters-vehicles.component.vue';
import LoginForm from '@/contexts/security/components/login-form.component.vue'
import RegisterForm from '@/contexts/security/components/register-form.component.vue'
import ListVehicle from '@/contexts/rentals/components/vehicles/list-vehicle.component.vue'
import EditVehicle from '@/contexts/rentals/components/vehicles/edit-vehicle.component.vue'
import FormVehicle from '@/contexts/rentals/components/vehicles/form-vehicle.component.vue'
import DetailsVehicle from '@/contexts/rentals/components/vehicles/details-vehicle.component.vue'

import ContractsRestricctionVehicle from '@/contexts/rentals/components/contracts/contracts-restricction-vehicle.component.vue'
import ContractsRent from '@/contexts/rentals/components/contracts/contracts-rent.component.vue'
import FiltersDetails from '@/contexts/rentals/components/filters/filters-details.component.vue'
import ContractsDownloadTenant from '@/contexts/rentals/components/contracts/contracts-download-tenant.component.vue'
import ContractsDownloadOwner from '@/contexts/rentals/components/contracts/contracts-download-owner.component.vue'
import ProfileEdit from '@/contexts/rentals/components/profile/profile-edit.component.vue'

const routes = [
  { path: '/', component: LoginForm , name:'/'},
  { path: '/login', component: LoginForm , name: 'login' },
  { path: '/register', component: RegisterForm , name: 'register' },
  { path: '/home', component: TheHome },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  {path: '/requestForm/:id', component: RequestForm , name:'RequestForm' , props:true },
  {path: '/requestTable', component: RequestTable, name:'RequestTable' },
  {path: '/myNotifications', component: PersonRents },
  {path: '/Details/:id', component: TableRents, name:'DetailsNotification', props:true },
  {path: '/searchVehicles', component: FiltersVehicles, name:'SearchVehicles'},
  {path: '/ListVehicles', component: ListVehicle, name: 'VehicleList' },
  {path: '/EditVehicle/:id', component: EditVehicle, name: 'EditVehicle', props:true },
  {path: '/AddVehicle', component: FormVehicle, name: 'AddVehicle' },
  {path: '/DetailsVehicle/:id', component: DetailsVehicle, name: 'VehicleDetails',props:true },
  {path: '/Restriccion', component: ContractsRestricctionVehicle, name: 'ContractsRestricction' },
  {path: '/ContractsRent/:id', component: ContractsRent, name: 'ContractsRent', props:true },
  {path: '/FiltersDetails/:id', component: FiltersDetails, name: 'FiltersDetails', props:true },
  {path: '/ContractsDownloadTenant/:id', component: ContractsDownloadTenant, name: 'ContractsDownloadTenant', props:true },
  {path: '/ContractsDownloadOwner/:id', component: ContractsDownloadOwner, name: 'ContractsDownloadOwner', props:true },
  {path: '/Profile', component: ProfileEdit, name: 'Profile' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router