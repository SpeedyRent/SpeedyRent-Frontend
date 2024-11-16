<template>
  <div v-if="vehicleId" class="details">
    <h2>{{ vehicleDetails?.brand }}</h2>
    <div class="container">
      <div class="items" >
        <p><strong>{{ $t('model') }}:</strong></p><div class="value-box">{{ vehicleDetails?.model }}</div>
        <p><strong>{{ $t('year') }}:</strong></p><div class="value-box">{{ vehicleDetails?.year }}</div>
        <p><strong>{{ $t('hourlyRate') }}:</strong></p><div class="value-box">{{ vehicleDetails?.rate }}</div>
        <p><strong>{{ $t('description') }}:</strong></p><div class="value-box">{{ vehicleDetails?.description }}</div>
      </div>

      <div class="photosVehicles">
        <p><strong>{{ $t('images') }}</strong></p>
        <pv-galleria
          :value="vehicleDetails?.photos"
          :numVisible="3"
          circular
          :autoPlay="true"
          :transitionInterval="3000"
          showThumbnails
        >
          <template #item="slotProps">
            <img :src="slotProps.item" alt="Vehicle Image" class="galleria-image" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item" alt="Vehicle Thumbnail" class="thumbnail-image" />
          </template>
        </pv-galleria>
      </div>
    </div>
    <div class="botones-section">
      <pv-button class="Edit" :label="$t('editVehicle')" icon="pi pi-pencil" @click="editVehicle(vehicleId)" />
      <pv-button :label="$t('delete')" icon="pi pi-trash" class="p-button-danger" @click="confirmDelete" />
      <pv-button :label="$t('back')" icon="pi pi-arrow-left" as="router-link" to="/ListVehicles" />
    </div>

    <pv-dialog :header="$t('confirmDeletion')" v-model:visible="deleteDialogVisible">
      <p>confirmDeletion</p>
      <pv-button :label="$t('cancel')" @click="deleteDialogVisible = false" />
      <pv-button :label="$t('confirm')" class="p-button-danger" as="router-link" to="/ListVehicles" @click="deleteVehicle" />
    </pv-dialog>

    <pv-toast />
  </div>
</template>


<script setup>
import {ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services';

const tenantService = new TenantApiServices();
const route = useRoute();
const router = useRouter();
const deleteDialogVisible = ref(false);

const vehicleId = ref(route.params.id);
const vehicleDetails = ref(null);

const fetchVehicleDetails = async () => {
  try {
    const response = await tenantService.getVehicleById(vehicleId.value);
    vehicleDetails.value = response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del vehículo:", error);
  }
};

const editVehicle = (car_id) => {
  router.push({ name: 'EditVehicle', params: { id: car_id } });
};

const confirmDelete = () => {
  deleteDialogVisible.value = true;
};

const deleteVehicle = async () => {
  try {
    await tenantService.deleteVehicle(vehicleId.value);
    deleteDialogVisible.value = false;
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
  }
};

onMounted(() => {
  fetchVehicleDetails();
});
</script>

<style scoped>
.details{
  width: 100%;
  height: 100%;
  font-size: 20px;
}
h2{
  font-size: 40px;
  padding: 20px;
  color: orange;
  font-weight: bold;
}
.botones-section{
  font-size: 50px;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 20px 0;
}
.container {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  justify-self: center;
  flex-wrap: wrap;
}
.items{
  width: 50%;
}
.value-box{
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  background-color: #f9f9f9;
  margin-top: 4px;
  width: 95%;
}

.photosVehicles {
  flex: 1;
  text-align: center;
}
strong{
  font-weight: bold;
}

.galleria-image {
  width: 400px;
  height: 300px;
  object-fit: cover;
}

.thumbnail-image {
  width: 80px;
  height: 60px;
  object-fit: cover;
}
</style>
