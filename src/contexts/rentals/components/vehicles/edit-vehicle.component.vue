<template>
  <div v-if="vehicleEdit">
    <h2>{{ $t('editVehicle') }}</h2>
    <div class="photos-section">
      <h3>{{ $t('currentPhotos') }}</h3>
      <div v-if="newPhotos.length === 0 && vehicleEdit.photos.length > 0">
        <pv-galleria
          :value="vehicleEdit.photos"
          :numVisible="3"
          circular
          :autoPlay="true"
          :transitionInterval="3000"
          showThumbnails
        >
          <template #item="slotProps">
            <div class="image-container">
              <img :src="slotProps.item" alt="Vehicle Photo" class="galleria-image" />
            </div>
          </template>
        </pv-galleria>
      </div>

      <div v-else>
        <pv-galleria
          :value="newPhotos"
          :numVisible="3"
          circular
          autoPlay
          :transitionInterval="3000"
        >
          <template #item="slotProps">
            <img :src="slotProps.item.preview" alt="New Vehicle Photo" class="galleria-image" />
          </template>
        </pv-galleria>
      </div>
    </div>

    <pv-button :label="$t('changePhotos')" icon="pi pi-images" @click="showChangePhotosDialog" />

    <pv-dialog :visible="changePhotosDialog" modal @hide="changePhotosDialog = false">
      <template #header>
        <h3>{{ $t('changePhotosDialogTitle') }}</h3>
      </template>
      <p>{{ $t('changePhotosDialogMessage') }}</p>
      <pv-button label="accept" icon="pi pi-check" @click="handleAcceptPhotoChange" />
      <pv-button label="reject" icon="pi pi-times" @click="changePhotosDialog = false" />
    </pv-dialog>

    <form @submit.prevent="saveVehicle" class="edit-form">
      <div>
        <label for="brand">{{ $t('brand') }}</label>
        <pv-input-text id="brand" v-model="vehicleEdit.brand" />
      </div>

      <div>
        <label for="model">{{ $t('model') }}</label>
        <pv-input-text id="model" v-model="vehicleEdit.model" />
      </div>

      <div>
        <label for="year">{{ $t('year') }}</label>
        <pv-input-number id="year" v-model="vehicleEdit.year" :min="1900" :max="new Date().getFullYear()" />
      </div>

      <div>
        <label for="rate">{{ $t('hourlyRate') }}</label>
        <pv-input-number id="rate" v-model="vehicleEdit.rate" mode="currency" currency="USD" />
      </div>

      <div>
        <label for="description">{{ $t('description') }}</label>
        <pv-textarea id="description" v-model="vehicleEdit.description" style="width: 100%"></pv-textarea>
      </div>

      <div v-if="allowPhotoSelection">
        <label for="photos">{{ $t('newPhotos') }}</label>
        <input type="file" id="photos" multiple @change="handlePhotoUpload" />
      </div>

      <div class="button-group">
        <pv-button :label="$t('saveChanges')" icon="pi pi-save" type="submit" />
        <pv-button :label="$t('cancel')" icon="pi pi-times" @click="goBack" />
      </div>
    </form>

    <pv-toast />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services';
import { useToast } from 'primevue/usetoast';

const vehicleEdit = ref(null);
const router = useRouter();
const route = useRoute();
const tenantService = new TenantApiServices();

const toast = useToast();
const vehicleId = ref(route.params.id);

const changePhotosDialog = ref(false);
const allowPhotoSelection = ref(false);
const newPhotos = ref([]);

const showChangePhotosDialog = () => {
  changePhotosDialog.value = true;
};

const handleAcceptPhotoChange = () => {
  changePhotosDialog.value = false;
  allowPhotoSelection.value = true;
};

const handlePhotoUpload = (event) => {
  const files = Array.from(event.target.files);
  newPhotos.value = files.map(file => ({
    name: file.name,
    preview: URL.createObjectURL(file),
  }));
};

const fetchVehicle = async () => {
  try {
    const response = await tenantService.getVehicleById(vehicleId.value);
    vehicleEdit.value = response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del vehículo:", error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el vehículo' });
  }
};

const saveVehicle = async () => {
  try {
    if (newPhotos.value.length > 0) {
      vehicleEdit.value.photos = newPhotos.value.map(photo => photo.name);
    }

    await tenantService.updateVehicleById(vehicleId.value, vehicleEdit.value);
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Vehículo actualizado correctamente' });
    router.push({ name: 'VehicleList' }); // Redirige a la lista de vehículos
  } catch (error) {
    console.error("Error al actualizar el vehículo:", error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el vehículo' });
  }
};

const goBack = () => {
  router.push({ name: 'VehicleList' });
};

onMounted(() => {
  fetchVehicle();
});
</script>

<style scoped>
.photos-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.galleria-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.image-container {
  width: 500px;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-form {
  display: grid;
  gap: 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
}
</style>
