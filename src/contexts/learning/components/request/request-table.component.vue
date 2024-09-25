<template>
  <div class="card" v-if="tenants.length">
    <h2 class="table-title">All Tenants</h2>
    <pv-data-table :value="tenants" tableStyle="width: 100%; padding: 20px;" class="styled-table">
      <pv-column field="img_car" header="Photo Car"></pv-column>
      <pv-column field="from" header="From"></pv-column>
      <pv-column field="to" header="To"></pv-column>
      <pv-column field="total_days" header="Days"></pv-column>
      <pv-column field="pick_up_time" header="Pick up time"></pv-column>
      <pv-column field="return_time" header="Return time"></pv-column>
      <pv-column field="total_mount" header="Total Mount"></pv-column>
      <pv-column header="Status">
        <template #body="slotProps">
          <pv-tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data)" />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services.js';

const tenants = ref([]);
const tenantApiServices = new TenantApiServices();

const getSeverity = (tenant) => {
  switch (tenant.status) {
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'warn';
    case 'Pendient':
      return 'info';
    default:
      return null;
  }
};

// Cargar todos los tenants cuando el componente se monta
onMounted(async () => {
  try {
    const tenantData = await tenantApiServices.getAllTenants();
    tenants.value = tenantData.data;
  } catch (error) {
    console.error('Error fetching tenants:', error);
  }
});
</script>



<style scoped>

.card {
  background-color: #f9f9f9; /* Fondo claro para la tarjeta */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 20px 0;
}

.styled-table {
  border-collapse: collapse;
  width: 100%;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.styled-table th {
  background-color: #4CAF50; /* Color de fondo para el encabezado */
  color: white;
}

.styled-table tr:hover {
  background-color: #f1f1f1; /* Color al pasar el mouse sobre la fila */
}

.styled-table .p-tag {
  margin: 0; /* Eliminar márgenes de los tags */
}

</style>