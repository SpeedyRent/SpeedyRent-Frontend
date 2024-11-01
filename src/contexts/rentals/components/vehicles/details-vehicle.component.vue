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

// Define una referencia para el ID del vehículo
const vehicleId = ref(route.params.id);
const vehicleDetails = ref(null);

// Función para obtener los detalles del vehículo
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
  deleteDialogVisible.value = true; // Muestra el diálogo de confirmación
};

const deleteVehicle = async () => {
  try {
    await tenantService.deleteVehicle(vehicleId.value); // Asegúrate de que esta función esté implementada en tu servicio
    deleteDialogVisible.value = false; // Cierra el diálogo de confirmación
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
  }
};

// Llama a la función al montar el componente
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
  flex-wrap: wrap; /* Permite que las columnas se envuelvan */
}
.items{
  width: 50%;
}
.value-box{
  border: 1px solid #ccc; /* Color del borde */
  border-radius: 4px; /* Bordes redondeados */
  padding: 8px; /* Espacio interno */
  background-color: #f9f9f9; /* Color de fondo */
  margin-top: 4px; /* Espacio entre el párrafo y el recuadro */
  width: 95%;
}

.photosVehicles {
  flex: 1;
  text-align: center;
}
strong{
  font-weight: bold;
}
/* Tamaño fijo y ajuste de imagen en la galería principal */
.galleria-image {
  width: 400px; /* Ajusta el tamaño según tus necesidades */
  height: 300px;
  object-fit: cover;
}

/* Tamaño fijo y ajuste de imagen en las miniaturas */
.thumbnail-image {
  width: 80px; /* Tamaño de las miniaturas */
  height: 60px;
  object-fit: cover;
}
</style>