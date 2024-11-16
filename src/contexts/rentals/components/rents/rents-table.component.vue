<template>
  <div class="card">
    <div class="table-data-tenant">
      <pv-data-table v-if="user" :value="[user]" tableStyle="min-width: 50rem" class="table">
        <template #header>
          <div class="titule_tabla">
            <span class="text-xl font-bold">{{$t('generalCustomerInformation')}}</span>
          </div>
        </template>
        <pv-column header="Photo">
          <template #body>
            <div class="image-container">
              <img :src="user.photo_user" alt="user header" class="photo" />
            </div>
          </template>
        </pv-column>
        <pv-column field="name" :header="$t('nameFull')"></pv-column>
        <pv-column field="dni" :header="$t('dni')"></pv-column>
        <pv-column field="phone" :header="$t('phone')"></pv-column>
        <pv-column field="email" :header="$t('email')"></pv-column>
      </pv-data-table>
    </div>
    <div class="table-container">
      <pv-data-table v-if="request" :value="[request]" tableStyle="min-width: 50rem" class="table">
        <template #header>
          <div class="titule_tabla">
            <span class="text-xl font-bold">{{$t('requestDetails')}}</span>
          </div>
        </template>
        <pv-column field="photo_Car" :header="$t('photoCar')">
          <template #body="slotProps">
            <div class="image-container">
              <img :src="slotProps.data.photo_Car" alt="Car Image" class="photo" />
            </div>
          </template>
        </pv-column>
        <pv-column field="from" :header="$t('from')"></pv-column>
        <pv-column field="to" :header="$t('to')"></pv-column>
        <pv-column field="total_days" :header="$t('totalDays')"></pv-column>
        <pv-column field="pick_up_time" :header="$t('pickUpTime')"></pv-column>
        <pv-column field="return_time" :header="$t('returnTime')"></pv-column>
        <pv-column field="total_mount" :header="$t('totalAmount')"></pv-column>
        <pv-column field="status" :header="$t('status')"></pv-column>
        <pv-column :header="$t('action')">
          <template #body="slotProps">
            <pv-button v-if="slotProps.data.contract==='Pendient' || slotProps.data.contract==='Rejected'" :label="$t('approved')" severity="success" rounded @click="approveTenant(slotProps.data)" style="margin-right: 0.5rem;" />
            <pv-button v-if="slotProps.data.contract==='Pendient' || slotProps.data.contract==='Rejected'" :label="$t('reject')" severity="danger" rounded @click="rejectTenant(slotProps.data)" />
            <pv-button v-if="slotProps.data.contract==='Approved'" :label="$t('contract')" @click="handleContract(slotProps.data.id)"/>
          </template>
        </pv-column>
      </pv-data-table>
      <div class="button-container">
        <RouterLink to="/myNotifications">
          <pv-button :label="$t('back')" class="center-button" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js';

const route = useRoute();
const tenantApiServices = new TenantApiServices();

const request = ref(null);
const user = ref(null);

const requestId = route.params.id;
const userId = route.query.requestId;

onMounted(async () => {

  console.log("ID del Usuario:", userId);
  console.log("ID del Request:", requestId);

  const userData = await tenantApiServices.getUserById(userId);
  user.value = userData.data;

  const requestData = await tenantApiServices.getRequestById(requestId);
  request.value = requestData.data;
  console.log("status del action del contrato",request.value.contract);


});

const approveTenant = async (tenant) => {
  tenant.status = "Approved";
  tenant.contract = "Pendient";
  await tenantApiServices.updateTenantDates(tenant.id, { status: tenant.status });
  await tenantApiServices.updateTenantDates(tenant.id, { contract: tenant.contract });
};

const rejectTenant = async (tenant) => {
  tenant.status = "Rejected";
  tenant.contract = "Rejected";
  await tenantApiServices.updateTenantDates(tenant.id, { status: tenant.status });
  await tenantApiServices.updateTenantDates(tenant.id, { contract: tenant.contract });
};

import { useRouter } from 'vue-router'
const router = useRouter();

const handleContract = (requestId) =>{
  console.log("id del request:", requestId);
  router.push({ name: 'ContractsDownloadOwner' ,params: {id: requestId} });
};
</script>

<style scoped>

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.styled-table th {
  background-color: #4CAF50;
  color: white;
}

.styled-table tr:hover {
  background-color: #f1f1f1;
}

.styled-table .p-tag {
  margin: 0;
}

.image-container {
  width: 80px;
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
