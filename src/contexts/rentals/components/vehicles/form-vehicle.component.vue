<template>
  <div>
    <h1>{{ $t('addNewVehicle') }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="brand">{{ $t('brand') }}</label>
        <pv-input-text v-model="vehicle.brand" aria-label="Brand" required />
      </div>

      <div>
        <label for="model">{{ $t('model') }}</label>
        <pv-input-text v-model="vehicle.model" aria-label="Model" required />
      </div>

      <div>
        <label for="year">{{ $t('year') }}</label>
        <pv-input-number v-model="vehicle.year" :min="1900" :max="new Date().getFullYear()" aria-label="Year" required />
      </div>

      <div>
        <label for="hourlyRate">{{ $t('hourlyRate') }}</label>
        <pv-input-number v-model="vehicle.rate" mode="currency" currency="PEN" aria-label="Hourly Rate" required />
      </div>

      <div>
        <label for="description">{{ $t('description') }}</label>
        <pv-textarea v-model="vehicle.description" aria-label="Description" required />
      </div>
      
      <div>
        <label for="location">{{ $t('location') }}</label>
        <pv-textarea v-model="vehicle.location" aria-label="location" required />
      </div>

      <div>
        <label for="images">{{ $t('images') }}</label>
        <input type="file" name="images" multiple @change="onFileChange" />
        <div v-if="imagePreviews.length">
          <h3>{{ $t('imagesPreview') }}</h3>
          <div v-for="(img, index) in imagePreviews" :key="index">
            <img :src="img" alt="Image Preview" width="100" />
          </div>
        </div>
      </div>
    </form>

    <pv-toast />
  </div>
</template>

<script setup>
import { ref , defineProps} from 'vue'
import { useRouter } from 'vue-router';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services';
import { useToast } from 'primevue/usetoast';

import { watch } from 'vue';

const props = defineProps({
  triggerSubmit: Boolean,
});

watch(() => props.triggerSubmit, (newValue) => {
  if (newValue) {
    submitForm();
  }
});

const vehicle = ref({
  contract:'accepted',
  brand: '',
  model: '',
  year: null,
  rate: null,
  description: '',
  location: '',
  photos: []
});

const imagePreviews = ref([]);
const toast = useToast();
const router = useRouter();
const tenantService = new TenantApiServices();

const onFileChange = (event) => {
  const files = event.target.files;
  vehicle.value.photos = [];
  imagePreviews.value = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    vehicle.value.photos.push(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file); // Generar la vista previa
  }
};

const submitForm = async () => {
  try {
    const response = await tenantService.createVehicle(vehicle.value);
    const newVehicleId = response.data.id;
    console.log("id nueva", newVehicleId);

    const loggedInUserId = localStorage.getItem('userId');

    const ownersResponse = await tenantService.getAllOwners();
    const foundOwner = ownersResponse.data.find(o => o.owner_id === loggedInUserId);

    if (foundOwner) {
      foundOwner.vehicles.push(newVehicleId);

      const updateData = {
        id: foundOwner.id,
        owner_id: foundOwner.owner_id,
        vehicles: foundOwner.vehicles
      };

      await tenantService.updateOwnerVehicles(foundOwner.id, updateData);

      console.log("despues de estar en el owner id");
    }

    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Vehículo creado correctamente' });
    router.push({ name: 'VehicleList' });
  } catch (error) {
    console.error('Error al crear el vehículo:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el vehículo' });
  }
};

</script>



<style scoped>
</style>
