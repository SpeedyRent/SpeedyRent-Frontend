<template>
  <div v-if="requesterDetails.length">
    <ul>
      <li v-for="person in requesterDetails" :key="person.id">
        <pv-card style="width: 25rem; overflow: hidden">
          <template #header>
            <div class="image-container">
              <img :src="person.photo" alt="user header" />
            </div>
          </template>
          <template #title>{{ person.name }}</template>
          <template #subtitle>{{$t('dni')}}: {{ person.dni }}</template>
          <template #footer>
            <pv-button icon="pi pi-eye" @click="handleViewDetails(person.id, findRequester(person)?.id)" />
          </template>
        </pv-card>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>{{$t('notVehicle')}}</p>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js';

const tenantApiServices = new TenantApiServices();
const router = useRouter();
const emit = defineEmits(['Details']);

const vehicles = ref([]);
const requests = ref([]);
const requesters = ref([]);
const tenants = ref([]);

const findRequesterCache = ref({});

const findRequester = (request) => {
  if (!request) return null; // Comprobar si request es nulo
  if (findRequesterCache.value[request.id]) {
    return findRequesterCache.value[request.id];
  }

  const tenant = tenants.value.find(tenant => tenant.request.includes(request.id));

  if (tenant) {
    const requester = requesters.value.find(user => user.id === tenant.tenant_id);
    findRequesterCache.value[request.id] = requester || null; // Cachear el resultado, asegurando que sea null si no se encuentra
    return requester;
  }

  return null;
};

const requesterDetails = computed(() => {
  return requests.value.map(personUser => {
    const requester = findRequester(personUser);
    return {
      id: personUser.id,
      name: requester ? requester.name : 'Desconocido', // Proporcionar un valor predeterminado
      dni: requester ? requester.dni : 'Desconocido', // Proporcionar un valor predeterminado
      photo: personUser.photo_Car,
    };
  });
});

const handleViewDetails = (userId, requestId) => {
  if (!requestId) {
    console.error("No se encontró un requestId válido.");
    return;
  }
  viewDetails(userId, requestId);
};

const viewDetails = (userId, requestId) => {
  router.push({
    name: 'DetailsNotification',
    params: { id: userId },
    query: { requestId: requestId }
  });
};

onBeforeMount(async () => {
  try {
    const ownersResponse = await tenantApiServices.getAllOwners();
    const loggedInUserId = localStorage.getItem('userId');
    const foundOwner = ownersResponse.data.find(o => o.owner_id === loggedInUserId);

    if (foundOwner) {
      const vehiclesResponse = await tenantApiServices.getAllVehicles();
      vehicles.value = vehiclesResponse.data.filter(vehicle => foundOwner.vehicles.includes(vehicle.id));

      const requestsResponse = await tenantApiServices.getAllRequests();
      requests.value = requestsResponse.data.filter(request => vehicles.value.some(vehicle => vehicle.id === request.car_id));

      const requestIds = requests.value.map(request => request.id);
      const tenantsResponse = await tenantApiServices.getAllTenants();
      tenants.value = tenantsResponse.data;

      const tenantIds = tenants.value
        .filter(tenant => tenant.request.some(reqId => requestIds.includes(reqId)))
        .map(tenant => tenant.tenant_id);

      const usersResponse = await tenantApiServices.getAllUsers();
      requesters.value = usersResponse.data.filter(user => tenantIds.includes(user.id));
    } else {
      console.log("No se encontró ningún propietario asociado con el ID de usuario.");
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
});
</script>


<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  list-style-type: none;
}
.image-container {
  width: 100%; /* Anchura completa del contenedor */
  height: 200px; /* Altura fija para todas las imágenes */
  overflow: hidden; /* Oculta cualquier desbordamiento */
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para que llene todo el espacio */
}
</style>