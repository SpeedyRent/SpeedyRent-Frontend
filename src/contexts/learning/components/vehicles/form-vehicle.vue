<template>
  <div>
    <h1>addNewVehicle</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label>brand</label>
        <pv-input-text v-model="vehicle.brand" aria-label="Brand" required />
      </div>
      <div>
        <label>model</label>
        <pv-input-text v-model="vehicle.model" aria-label="Model" required />
      </div>
      <div>
        <label>year</label>
        <pv-input-number v-model="vehicle.year" :min="1900" :max="new Date().getFullYear()" aria-label="Year" required />
      </div>
      <div>
        <label>hourlyRate</label>
        <pv-input-number v-model="vehicle.rate" mode="currency" currency="USD" aria-label="Hourly Rate" required />
      </div>
      <div>
        <label>description</label>
        <pv-textarea v-model="vehicle.description" aria-label="Description" required />
      </div>
      <div>
        <label>images</label>
        <pv-fileupload name="images" multiple customUpload :auto="true" @uploader="onUpload" />
        <div v-if="imagePreviews.length">
          <h3>images</h3>
          <div v-for="(img, index) in imagePreviews" :key="index">
            <img :src="img" alt="Image Preview" width="100" />
          </div>
        </div>
      </div>
      <pv-button label="submit" type="submit" />
    </form>

    <pv-toast />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services';
import { useToast } from 'primevue/usetoast';

export default {
  setup() {
    const vehicle = ref({
      id: Date.now(),
      brand: '',
      model: '',
      year: null,
      rate: null,
      description: '',
      images: []
    });

    const imagePreviews = ref([]);
    const router = useRouter();
    const tenantService = new TenantApiServices();
    const toast = useToast();
    const loggedInTenantId = 'b46a'; // Reemplaza con el ID del arrendatario logueado

    const onUpload = event => {
      const files = event.files;
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = e => {
          imagePreviews.value.push(e.target.result);
          vehicle.value.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const submitForm = async () => {
      try {
        await tenantService.addVehicleToTenant(loggedInTenantId, vehicle.value);
        toast.add({ severity: 'success', summary: '', detail: 'Vehicle added' });
        router.push({ name: 'ListVehicles' });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      vehicle,
      imagePreviews,
      onUpload,
      submitForm,
      $t: key => key
    };
  }
};
</script>


<style scoped>
</style>