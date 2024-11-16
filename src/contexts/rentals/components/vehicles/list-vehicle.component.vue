<template>
  <div class="list">
    <div>
      <h2>{{$t('Vehicles')}}</h2>
      <pv-button :label="$t('addNewVehicle')" class="addVehicle" icon="pi pi-plus" rounded @click="addVehicle" />
    </div>
    <div v-if="foundOwner">
      <pv-data-table :value="vehicles" responsiveLayout="scroll" class="table">
        <pv-column :header="$t('photos')">
          <template #body="slotProps">
            <img v-if="slotProps.data.photos && slotProps.data.photos.length"
                 :src="slotProps.data.photos[0]"
                 alt="Vehicle photo"
                 style="width: 100px; height: 60px;" />
            <span v-else>No image</span>
          </template>
        </pv-column>
        <pv-column field="brand" :header="$t('brand')"></pv-column>
        <pv-column field="model" :header="$t('model')"></pv-column>
        <pv-column field="year" :header="$t('year')"></pv-column>
        <pv-column :header="$t('Actions')">
          <template #body="slotProps">
            <pv-button icon="pi pi-eye" @click="viewDetails(slotProps.data.id)" />
            <pv-button icon="pi pi-pencil" @click="editVehicle(slotProps.data.id)" />
            <pv-button icon="pi pi-trash" class="p-button-danger" @click="confirmDelete(slotProps.data.id)" />
          </template>
        </pv-column>
      </pv-data-table>

      <pv-dialog :header="$t('confirmDeletion')" v-model:visible="deleteDialogVisible">
        <p>{{$t('confirmDeletion')}}</p>
        <pv-button :label="$t('cancel')" @click="deleteDialogVisible = false" />
        <pv-button :label="$t('confirm')" class="p-button-danger" @click="deleteVehicle" />
      </pv-dialog>

      <pv-toast />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services';

const vehicles = ref([]);
const deleteDialogVisible = ref(false);
const router = useRouter();
const tenantService = new TenantApiServices();
const vehicleToDelete = ref(null);
const foundOwner = ref(false);

const loggedInUserId = localStorage.getItem('userId');

const fetchOwnerVehicles = async () => {
  try {
    const ownersResponse = await tenantService.getAllOwners();
    console.log("Data de propietarios:", ownersResponse.data);
    const owner = ownersResponse.data.find(o => o.owner_id === loggedInUserId);

    if (owner) {
      foundOwner.value = true;
      console.log("Propietario encontrado:", owner);

      const vehiclesResponse = await tenantService.getAllVehicles();
      console.log("Data de vehículos:", vehiclesResponse.data);
      vehicles.value = vehiclesResponse.data.filter(vehicle => owner.vehicles.includes(vehicle.id));
      console.log("Vehículos del propietario:", vehicles.value);
    } else {
      foundOwner.value = false;
      console.log("No se encontró un propietario con el ID:", loggedInUserId);
    }
  } catch (error) {
    console.error("Error al obtener vehículos del propietario:", error);
  }
}

const addVehicle = () => {
  router.push({ name: 'ContractsRestricction' });
}

const viewDetails = (car_id) => {
  router.push({ name: 'VehicleDetails', params: { id: car_id } });
};

const editVehicle = (car_id) => {
  router.push({ name: 'EditVehicle', params: { id: car_id } });
};

const confirmDelete = (vehicleId) => {
  deleteDialogVisible.value = true;
  vehicleToDelete.value = vehicleId;
};

const deleteVehicle = async () => {
  try {
    await tenantService.deleteVehicle(vehicleToDelete.value);

    vehicles.value = vehicles.value.filter(vehicle => vehicle.id !== vehicleToDelete.value);

    deleteDialogVisible.value = false;
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
  }
};

fetchOwnerVehicles();

</script>


<style scoped>

.list{
  height: 100vh;
  width: 100%;
}
.addVehicle{
 align-items: center;
  gap:10px;
}

h2{
  font-size: 40px;
  padding: 20px;
}

.table{
  gap:10px;
  padding: 20px;
}


</style>
