<template>
  <div>
    <ul>
      <li v-for="personTenant in tenant" :key="personTenant.id">
        <pv-card style="width: 25rem; overflow: hidden">
          <template #header>
            <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" width=100% />
          </template>
          <template #title>{{personTenant.name}}</template>
          <template #subtitle>DNI:{{personTenant.dni}}</template>
          <template #footer>
            <div class="flex gap-4 mt-1">
              <RouterLink :to="{ path: '/details', query: { id: personTenant.id } }">
                <pv-button @click="passInfo(personTenant)" label="Details" class="w-full" />
              </RouterLink>
            </div>
          </template>
        </pv-card>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, provide } from 'vue'
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services.js'

const tenant = ref([]);
const tenantApiServices = new TenantApiServices();

const emit = defineEmits(['Details'])

const passInfo = (personTenant) => {
  provide('selectedTenant', personTenant);
}

onBeforeMount(async () => {
  const tenants = await tenantApiServices.getAllTenants();
  tenant.value = tenants.data;
})

</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  list-style-type: none;
}
</style>