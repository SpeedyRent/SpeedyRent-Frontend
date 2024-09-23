<template>
  <p v-if="!showTable"></p>
  <div class="card" v-if="showTable">
    <h2 class="table-title">Requests</h2>
    <pv-data-table :value="[selectedTenant]" tableStyle="width: 100%; padding: 20px;" class="styled-table">
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
      <template #footer> In total there is 1 request. </template>
    </pv-data-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services.js';

// Variables para almacenar los datos
const selectedTenant = ref(null);
const showTable = ref(false);
const route = useRoute();
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

onMounted(async () => {
  // Carga todos los tenants
  const tenantData = await tenantApiServices.getAllTenants();
  tenants.value = tenantData.data;

  // Busca el tenant específico usando el ID del query
  const tenantId = route.query.id;
  selectedTenant.value = tenants.value.find(tenant => tenant.id == tenantId);

  //Para agregar condiciones , aqui se puede aplicar lo de la placa del auto
  //(tenant => tenant.id == tenantId && tenant.status.toLowerCase() === 'pendient')

  // Muestra la tabla solo si se encontró un tenant con el estado "pendient"
  showTable.value = !!selectedTenant.value;
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