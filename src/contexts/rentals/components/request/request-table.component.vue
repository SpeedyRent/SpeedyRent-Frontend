<template>
  <div class="card" v-if="requests.length">
    <h2 class="table-title">{{$t('viewingAllRequests')}}</h2>
    <pv-data-table :value="requests" tableStyle="width: 100%; padding: 20px;" class="styled-table">
      <pv-column field="photo_Car" :header="$t('photoCar')">
        <template #body="slotProps">
          <img :src="slotProps.data.photo_Car" alt="Car Photo" style="width: 100px; height: auto; border-radius: 5px;" />
        </template>
      </pv-column>
      <pv-column field="from" :header="$t('from')"></pv-column>
      <pv-column field="to" :header="$t('to')"></pv-column>
      <pv-column field="total_days" :header="$t('totalDays')"></pv-column>
      <pv-column field="pick_up_time" :header="$t('pickUpTime')"></pv-column>
      <pv-column field="return_time" :header="$t('returnTime')"></pv-column>
      <pv-column field="total_mount" :header="$t('totalAmount')"></pv-column>
      <pv-column :header="$t('status')">
        <template #body="slotProps">
          <pv-tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data)" />
        </template>
      </pv-column>
      <pv-column :header="$t('action')">
        <template #body="slotProps">
          <pv-button v-if="slotProps.data.status === 'Approved' && slotProps.data.contract === 'Pendient'" :label="$t('pay')" @click="handleAction(slotProps.data.id)" />
          <pv-button v-if="slotProps.data.contract === 'Approved'" :label="$t('contract')" @click="handleContract(slotProps.data.id)" />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
  <div v-else >
    <p>{{$t('notRequest')}}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js';
import { useRouter } from 'vue-router'

const tenantApiServices = new TenantApiServices();
const requests = ref([]);
const loggedInUserId = localStorage.getItem('userId');
const router = useRouter();

const fetchOwnerVehicles = async () => {
  const tenantsResponse  = await tenantApiServices.getAllTenants();
  const foundTenant  = tenantsResponse.data.find(o => o.tenant_id === loggedInUserId);
  const requestsResponse  = await tenantApiServices.getAllRequests();
  requests.value = requestsResponse.data.filter(request => foundTenant.request.includes(request.id));
}

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

const handleAction = (requestId) => {
  console.log("id del request:", requestId);
  router.push({ name: 'ContractsRent' ,params: {id: requestId} });
};

const handleContract = (requestId) =>{
  console.log("id del request:", requestId);
  router.push({ name: 'ContractsDownloadTenant' ,params: {id: requestId} });
};

fetchOwnerVehicles();

</script>

<style scoped>

.card {
  background-color: #f9f9f9;
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
  background-color: #4CAF50;
  color: white;
}

.styled-table tr:hover {
  background-color: #f1f1f1;
}

.styled-table .p-tag {
  margin: 0;
}

</style>
