<template>
  <pv-card class="custom-card">
    <template #header>
      <pv-galleria
        :value="vehicleDetails?.photos"
        :numVisible="3"
        circular
        :autoPlay="true"
        :transitionInterval="3000"
        showThumbnails
      >
        <!-- Plantilla para cada imagen principal -->
        <template #item="slotProps">
          <img :src="slotProps.item" alt="Vehicle Image" class="galleria-image" />
        </template>
        <!-- Plantilla para cada miniatura -->
        <template #thumbnail="slotProps">
          <img :src="slotProps.item" alt="Vehicle Thumbnail" class="thumbnail-image" />
        </template>
      </pv-galleria>
    </template>
    <template #title><p> {{ vehicleDetails?.brand }} </p></template>
    <template #subtitle>{{ vehicleDetails?.model }}</template>
    <template #content>
      <div class="custom-content">
        <p><strong>{{ $t('model') }}:</strong> {{ vehicleDetails?.model }}</p>
        <p><strong>{{ $t('year') }}:</strong> {{ vehicleDetails?.year }}</p>
        <p><strong>{{ $t('hourlyRate') }}:</strong> {{ vehicleDetails?.rate }}</p>
        <p><strong>{{ $t('description') }}:</strong> {{ vehicleDetails?.description }}</p>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1" style="display: flex; justify-content: space-between; width: 100%;">
        <pv-button :label="$t('back')" severity="secondary" icon="pi pi-arrow-left" outlined class="w-full" style="margin-right: auto;" @click="Filters" />
        <pv-button :label="$t('request')" severity="secondary" outlined class="w-full" style="margin-left: auto;" @click="requestForm(vehicleId)" />
      </div>
    </template>
  </pv-card>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services';

const tenantService = new TenantApiServices();
const route = useRoute();
const router = useRouter();

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

const requestForm = (car_id) => {
  console.log("car_id",car_id);
  router.push({ name: 'RequestForm', params: { id: car_id } });
};

const Filters = () => {
  router.push({ name: 'SearchVehicles' });
};

onMounted(() => {
  fetchVehicleDetails();
});

</script>

<style scoped>

.custom-card {
  border: 5px solid #e46132;
  border-radius: 20px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.5);
  padding: 16px;
  width: 80%;
  height: 95%;
}

.custom-content {
  background-color: #eae7e7; /* Color de fondo */
  padding: 8px;             /* Espaciado interno */
  border-radius: 6px;        /* Bordes redondeados */
}

.custom-content p strong {
  font-weight: bold; /* Aplica negrita al texto dentro de <strong> */
}

.galleria-image {
  width: 260px; /* Ajusta el tamaño según tus necesidades */
  height: 160px;
  object-fit: cover;
}


.thumbnail-image {
  width: 40px; /* Tamaño de las miniaturas */
  height: 20px;
  object-fit: cover;
}
</style>