<template>
  <div>

    <h2>{{ $t('vehicles') }}</h2>
    <pv-button label=" addNewVehicle " icon="pi pi-plus" @click="goToAddVehicle" />
    <pv-data-table :value="vehicles" responsiveLayout="scroll">
      <pv-column field="brand" :header="$t('brand')"></pv-column>
      <pv-column field="model" :header="$t('model')"></pv-column>
      <pv-column field="year" :header="$t('year')"></pv-column>
      <pv-column field="rate" :header="$t('hourlyRate')"></pv-column>
      <pv-column :header="$t('actions')">
        <template #body="slotProps">
          <pv-button icon="pi pi-eye" @click="viewDetails(slotProps.data.id)" />
          <pv-button icon="pi pi-pencil" @click="editVehicle(slotProps.data.id)" />
          <pv-button icon="pi pi-trash" class="p-button-danger" @click="confirmDelete(slotProps.data.id)" />
        </template>
      </pv-column>
    </pv-data-table>

    <pv-dialog :header="$t('confirmDeletion')" v-model:visible="deleteDialogVisible">
      <p>{{ $t('confirmDeletion') }}</p>
      <pv-button label="{{ $t('cancel') }}" @click="deleteDialogVisible = false" />
      <pv-button label="{{ $t('confirm') }}" class="p-button-danger" @click="deleteVehicle" />
    </pv-dialog>

    <pv-toast />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services';
import { useToast } from 'primevue/usetoast';

export default {
  setup() {
    const vehicles = ref([]);
    const deleteDialogVisible = ref(false);
    const router = useRouter();
    const tenantService = new TenantApiServices();
    const toast = useToast();
    const loggedInTenantId = 'b46a'; // Reemplaza con el ID del arrendatario logueado
    const vehicleIdToDelete = ref(null);

    const fetchVehicles = async () => {
      try {
        vehicles.value = await tenantService.getVehiclesByTenantId(loggedInTenantId);
      } catch (error) {
        console.error(error);
      }
    };

    const goToAddVehicle = () => {
      router.push({ name: 'AddVehicle' });
    };

    const viewDetails = id => {
      router.push({ name: 'VehicleDetails', params: { id } });
    };

    const editVehicle = id => {
      router.push({ name: 'EditVehicle', params: { id } });
    };

    const confirmDelete = id => {
      vehicleIdToDelete.value = id;
      deleteDialogVisible.value = true;
    };

    const deleteVehicle = async () => {
      try {
        await tenantService.deleteVehicleFromTenant(loggedInTenantId, vehicleIdToDelete.value);
        toast.add({ severity: 'success', summary: '', detail: 'Vehicle deleted' });
        deleteDialogVisible.value = false;
        fetchVehicles();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchVehicles();
    });

    return {
      vehicles,
      deleteDialogVisible,
      goToAddVehicle,
      viewDetails,
      editVehicle,
      confirmDelete,
      deleteVehicle,
      $t: key => key // Soporte básico para i18n
    };
  }
};
</script>


<style scoped>
</style>