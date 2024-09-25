<template>
  <div v-if="vehicle">
    <h1>{{ vehicle.brand }} {{ vehicle.model }}</h1>
    <p><strong>{{ $t('year') }}:</strong> {{ vehicle.year }}</p>
    <p><strong>{{ $t('hourlyRate') }}:</strong> {{ vehicle.rate }}</p>
    <p><strong>{{ $t('description') }}:</strong> {{ vehicle.description }}</p>
    <div v-if="vehicle.images && vehicle.images.length">
      <h3>{{ $t('images') }}</h3>
      <div v-for="(img, index) in vehicle.images" :key="index">
        <img :src="img" alt="Vehicle Image" width="200" />
      </div>
    </div>
    <pv-button label="editVehicle" icon="pi pi-pencil" @click="editVehicle" />
    <pv-button label="deleteVehicle" icon="pi pi-trash" class="p-button-danger" @click="confirmDelete" />
    <pv-button label="vehicles" icon="pi pi-arrow-left" @click="goBack" />

    <pv-dialog :header="$t('confirmDeletion')" v-model:visible="deleteDialogVisible">
      <p>confirmDeletion</p>
      <pv-button label="cancel" @click="deleteDialogVisible = false" />
      <pv-button label="confirm" class="p-button-danger" @click="deleteVehicle" />
    </pv-dialog>

    <pv-toast />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services';
import { useToast } from 'primevue/usetoast';

export default {
  setup() {
    const vehicle = ref(null);
    const router = useRouter();
    const route = useRoute();
    const tenantService = new TenantApiServices();
    const deleteDialogVisible = ref(false);
    const toast = useToast();
    const loggedInTenantId = 'b46a'; // Reemplaza con el ID del arrendatario logueado

    const fetchVehicle = async () => {
      try {
        const vehicles = await tenantService.getVehiclesByTenantId(loggedInTenantId);
        vehicle.value = vehicles.find(v => v.id === parseInt(route.params.id));
      } catch (error) {
        console.error(error);
      }
    };

    const editVehicle = () => {
      router.push({ name: 'EditVehicle', params: { id: route.params.id } });
    };

    const confirmDelete = () => {
      deleteDialogVisible.value = true;
    };

    const deleteVehicle = async () => {
      try {
        await tenantService.deleteVehicleFromTenant(loggedInTenantId, vehicle.value.id);
        deleteDialogVisible.value = false;
        toast.add({ severity: 'success', summary: '', detail: 'Vehicle deleted' });
        router.push({ name: 'VehicleList' });
      } catch (error) {
        console.error(error);
      }
    };

    const goBack = () => {
      router.push({ name: 'VehicleList' });
    };

    onMounted(() => {
      fetchVehicle();
    });

    return {
      vehicle,
      editVehicle,
      confirmDelete,
      deleteVehicle,
      deleteDialogVisible,
      goBack,
      $t: key => key // Soporte básico para i18n
    };
  }
};
</script>

<style scoped>

</style>