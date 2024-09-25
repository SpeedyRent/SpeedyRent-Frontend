<template>
  <div v-if="vehicle">
    <h1>{{ $t('editVehicle') }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label>{{ $t('brand') }}</label>
        <pv-input-text v-model="vehicle.brand" aria-label="Brand" required />
      </div>
      <div>
        <label>{{ $t('model') }}</label>
        <pv-input-text v-model="vehicle.model" aria-label="Model" required />
      </div>
      <div>
        <label>{{ $t('year') }}</label>
        <pv-input-number v-model="vehicle.year" :min="1900" :max="new Date().getFullYear()" aria-label="Year" required />
      </div>
      <div>
        <label>{{ $t('hourlyRate') }}</label>
        <pv-input-number v-model="vehicle.rate" mode="currency" currency="USD" aria-label="Hourly Rate" required />
      </div>
      <div>
        <label>{{ $t('description') }}</label>
        <pv-textarea v-model="vehicle.description" aria-label="Description" required />
      </div>
      <pv-button label="{{ $t('submit') }}" type="submit" />
    </form>

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

    const submitForm = async () => {
      try {
        await tenantService.updateVehicleInTenant(loggedInTenantId, vehicle.value.id, vehicle.value);
        toast.add({ severity: 'success', summary: '', detail: 'Vehicle updated' });
        router.push({ name: 'VehicleDetails', params: { id: vehicle.value.id } });
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchVehicle();
    });

    return {
      vehicle,
      submitForm,
      $t: key => key // Soporte básico para i18n
    };
  }
};
</script>


<style scoped>
</style>