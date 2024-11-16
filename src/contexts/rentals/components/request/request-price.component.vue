<template>
  <div>
    <p v-if="tenantPrice !== null"> {{$t('dailyRate')}}: {{ tenantPrice }} soles</p>
    <p v-else>No se encontró el arrendatario.</p>
    <div>
      <pv-input-text v-model="priceFinish" disabled />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js';
import { useRoute } from 'vue-router'

const tenantPrice = ref(null);
const tenantApi = new TenantApiServices();
const priceFinish = ref(0);
const daysTotal = ref(0);

const route = useRoute();

const vehicleId = ref(route.params.id);

const fetchTenants = async () => {
  try {
    const response = await tenantApi.getVehicleById(vehicleId.value);
    const vehicle = response.data;
    console.log("id del vehiculo",vehicleId.value);
    if (vehicle) {
      tenantPrice.value = vehicle.rate;
    } else {
      tenantPrice.value = null;
    }
  } catch (error) {
    console.error("Error fetching tenants:", error);
    tenantPrice.value = null;
  }
};

onMounted(fetchTenants);

watch([tenantPrice, daysTotal], ([newPrice, newDays]) => {
  if (newPrice !== null && newDays > 0) {
    priceFinish.value = newPrice * newDays;
  } else {
    priceFinish.value = 0;
  }
});

const updateDaysTotal = (days) => {
  daysTotal.value = days;
};

defineExpose({ tenantPrice, priceFinish, updateDaysTotal, daysTotal });
</script>

<style scoped>

</style>
