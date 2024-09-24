import { createRouter, createWebHistory } from 'vue-router';
import VehicleList from '../components/VehicleList.vue';
import VehicleForm from '../components/VehicleForm.vue';
import VehicleDetails from '../components/VehicleDetails.vue';
import EditVehicle from '../components/EditVehicle.vue';

const routes = [
    {
        path: '/',
        name: 'VehicleList',
        component: VehicleList,
    },
    {
        path: '/add-vehicle',
        name: 'AddVehicle',
        component: VehicleForm,
    },
    {
        path: '/vehicle/:id',
        name: 'VehicleDetails',
        component: VehicleDetails,
        props: true,
    },
    {
        path: '/edit-vehicle/:id',
        name: 'EditVehicle',
        component: EditVehicle,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
