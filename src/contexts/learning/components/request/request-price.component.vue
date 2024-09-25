<template>
  <div>
    <p v-if="tenantPrice !== null"> Unit Price: {{ tenantPrice }} soles</p>
    <p v-else>No se encontró el arrendatario.</p>
    <div>
      <pv-input-text v-model="priceFinish" disabled placeholder="Disabled" />
    </div>
  </div>
</template>

<script setup>
//import { ref, onMounted, watch, defineExpose } from "vue";
import { ref, onMounted, watch } from "vue";
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services.js';

const tenantPrice = ref(null);
const tenantApi = new TenantApiServices();
const priceFinish = ref(0);
const daysTotal = ref(0);

const fetchTenants = async () => {
  try {
    const response = await tenantApi.getAllTenants();
    const tenants = response.data;

    const tenant = tenants.find(tenant => tenant.id === "137c");
    if (tenant) {
      tenantPrice.value = tenant.price;
    } else {
      tenantPrice.value = null;
    }
  } catch (error) {
    console.error("Error fetching tenants:", error);
    tenantPrice.value = null;
  }
};

onMounted(fetchTenants);

// Observa los cambios en tenantPrice y daysTotal
watch([tenantPrice, daysTotal], ([newPrice, newDays]) => {
  if (newPrice !== null && newDays > 0) {
    priceFinish.value = newPrice * newDays;
  } else {
    priceFinish.value = 0;
  }
});

// Define la función para actualizar daysTotal
const updateDaysTotal = (days) => {
  daysTotal.value = days; // Actualiza el valor de daysTotal
};

defineExpose({ tenantPrice, priceFinish, updateDaysTotal, daysTotal });
</script>

<style scoped>

</style>