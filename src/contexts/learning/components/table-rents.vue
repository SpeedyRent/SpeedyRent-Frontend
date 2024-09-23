<template>
  <div class="card">
    <div class="table-data-tenant">
      <pv-data-table v-if="selectedTenant" :value="[selectedTenant]" tableStyle="min-width: 50rem" class="table">
        <template #header>
          <div class="titule_tabla">
            <span class="text-xl font-bold">General Customer Information</span>
          </div>
        </template>
        <pv-column header="Photo">
          <template #body="slotProps">
            <img :src="slotProps.data.photo" alt="Tenant Photo" class="w-6rem border-round" />
          </template>
        </pv-column>
        <pv-column field="name" header="Name"></pv-column>
        <pv-column field="dni" header="DNI"></pv-column>
        <pv-column field="phone" header="Phone"></pv-column>
        <pv-column field="email" header="Email"></pv-column>
      </pv-data-table>
    </div>
    <div class="table-container">
      <pv-data-table v-if="selectedTenant" :value="[selectedTenant]" tableStyle="min-width: 50rem" class="table">
        <template #header>
          <div class="titule_tabla">
            <span class="text-xl font-bold">Details of the Request</span>
          </div>
        </template>
        <pv-column field="img_car" header="Photo Car"></pv-column>
        <pv-column field="type_Car" header="Type Car"></pv-column>
        <pv-column field="from" header="From"></pv-column>
        <pv-column field="to" header="To"></pv-column>
        <pv-column field="total_days" header="Days"></pv-column>
        <pv-column field="pick_up_time" header="Pick up time"></pv-column>
        <pv-column field="return_time" header="Return time"></pv-column>
        <pv-column field="price" header="Price"></pv-column>
        <pv-column field="status" header="Status"></pv-column>
        <pv-column header="Action">
          <template #body="slotProps">
            <pv-button label="Approve" severity="success" rounded @click="approveTenant(slotProps.data)" style="margin-right: 0.5rem;" />
            <pv-button label="Reject" severity="danger" rounded @click="rejectTenant(slotProps.data)" />
          </template>
        </pv-column>
      </pv-data-table>
      <div class="button-container">
        <RouterLink to="/myNotifications">
          <pv-button label="Back" @click="goBack" class="center-button" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services.js';

const selectedTenant = ref(null);
const route = useRoute(); // Inicializa la ruta
const tenants = ref([]); // Array para almacenar todos los tenants
const tenantApiServices = new TenantApiServices(); // Asegúrate de que este servicio esté importado

onMounted(async () => {
  // Carga todos los tenants
  const tenantData = await tenantApiServices.getAllTenants();
  tenants.value = tenantData.data;

  // Busca el tenant específico usando el ID del query
  const tenantId = route.query.id;
  selectedTenant.value = tenants.value.find(tenant => tenant.id == tenantId); // Busca por ID
});

const approveTenant = async (tenant) => {
  tenant.status = "Approved";
  await tenantApiServices.updateTenantDates(tenant.id, { status: tenant.status }); // Actualiza en la API
};
const rejectTenant = async (tenant) => {
  tenant.status = "Rejected";
  await tenantApiServices.updateTenantDates(tenant.id, { status: tenant.status }); // Actualiza en la API
};
</script>

<style scoped>
.table-title {
  font-size: 24px; /* Tamaño de fuente grande */
  color: #4CAF50; /* Color del título */
  margin-bottom: 16px; /* Espaciado debajo del título */
  text-align: center; /* Centra el título */
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