<template>
  <div>
    <h1>{{ $t('addNewVehicle') }}</h1>
    <form @submit.prevent="submitForm">
      <!-- Marca -->
      <div>
        <label for="brand">{{ $t('brand') }}</label>
        <pv-input-text v-model="vehicle.brand" aria-label="Brand" required />
      </div>

      <!-- Modelo -->
      <div>
        <label for="model">{{ $t('model') }}</label>
        <pv-input-text v-model="vehicle.model" aria-label="Model" required />
      </div>

      <!-- Año -->
      <div>
        <label for="year">{{ $t('year') }}</label>
        <pv-input-number v-model="vehicle.year" :min="1900" :max="new Date().getFullYear()" aria-label="Year" required />
      </div>

      <!-- Tarifa por hora -->
      <div>
        <label for="hourlyRate">{{ $t('hourlyRate') }}</label>
        <pv-input-number v-model="vehicle.rate" mode="currency" currency="PEN" aria-label="Hourly Rate" required />
      </div>

      <!-- Descripción -->
      <div>
        <label for="description">{{ $t('description') }}</label>
        <pv-textarea v-model="vehicle.description" aria-label="Description" required />
      </div>

      <!-- Direccion -->
      <div>
        <label for="location">{{ $t('location') }}</label>
        <pv-textarea v-model="vehicle.location" aria-label="location" required />
      </div>

      <!-- Imágenes -->
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

// Detecta el cambio en el `prop` triggerSubmit y llama a submitForm si es `true`
watch(() => props.triggerSubmit, (newValue) => {
  if (newValue) {
    submitForm();
  }
});

// Crear referencia para el nuevo vehículo
const vehicle = ref({
  contract:'accepted',
  brand: '',
  model: '',
  year: null,
  rate: null,
  description: '',
  location: '',
  photos: []  // Array donde se guardarán las fotos
});

// Guardar vista previa de imágenes
const imagePreviews = ref([]);
const toast = useToast();
const router = useRouter();
const tenantService = new TenantApiServices();

// Función para manejar la carga de imágenes y generar vista previa
const onFileChange = (event) => {
  const files = event.target.files;
  vehicle.value.photos = [];

  // Limpiar las vistas previas anteriores
  imagePreviews.value = [];

  // Leer los archivos y generar las vistas previas
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    vehicle.value.photos.push(file.name); // Guardamos solo el nombre del archivo en la API

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file); // Generar la vista previa
  }
};

// Función para enviar el formulario y crear el nuevo vehículo
const submitForm = async () => {
  try {
    // Llama a la API para crear el nuevo vehículo
    const response = await tenantService.createVehicle(vehicle.value);
    const newVehicleId = response.data.id; // Accede al ID del nuevo vehículo
    console.log("id nueva", newVehicleId);

    // Obtener el ID del propietario logueado
    const loggedInUserId = localStorage.getItem('userId');

    // Obtener todos los propietarios
    const ownersResponse = await tenantService.getAllOwners();
    const foundOwner = ownersResponse.data.find(o => o.owner_id === loggedInUserId);

    // Actualizar el arreglo de vehículos del propietario
    if (foundOwner) {
      foundOwner.vehicles.push(newVehicleId); // Agregar nuevo vehículo al arreglo

      const updateData = {
        id: foundOwner.id,        // Incluye el id del owner
        owner_id: foundOwner.owner_id,  // Incluye el owner_id
        vehicles: foundOwner.vehicles // Mantiene el arreglo de vehículos actualizado
      };

      // Actualiza el propietario con la estructura correcta
      await tenantService.updateOwnerVehicles(foundOwner.id, updateData);

      console.log("despues de estar en el owner id");
    }

    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Vehículo creado correctamente' });
    router.push({ name: 'VehicleList' }); // Redirigir a la lista de vehículos
  } catch (error) {
    console.error('Error al crear el vehículo:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el vehículo' });
  }
};

</script>



<style scoped>
</style>