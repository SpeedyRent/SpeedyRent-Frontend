<template>
  <div class="card">
    <div class="title">
      <p>{{$t('search')}}</p>
    </div>
    <div class="filter">
      <!-- Data Table para vehículos -->
      <pv-data-table v-model:filters="filters" :value="vehicles" paginator :rows="5" dataKey="id" filterDisplay="row" :loading="loading"
                     :globalFilterFields="['brand', 'model', 'year', 'rate']">
        <template #empty> {{$t('thereIsNoRegisteredVehicle')}} </template>
        <!-- Columna de Photos -->
        <pv-column :header="$t('images')" style="min-width: 12rem">
          <template #body="{ data: vehicle }">
            <img v-if="vehicle.photos && vehicle.photos.length"
                 :src="vehicle.photos[0]"
                 alt="Vehicle photo"
                 style="width: 100px; height: 60px;" />
            <span v-else>No image</span>
          </template>
        </pv-column>

        <!-- Columna de Marca -->
        <pv-column field="brand" :header="$t('brand')" style="min-width: 12rem">
          <template #body="{ data: vehicle }">
            {{ vehicle.brand }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <pv-input-text v-model="filterModel.value" type="text" @input="filterCallback()" :placeholder="$t('searchByBrand')" />
          </template>
        </pv-column>

        <!-- Columna de Modelo -->
        <pv-column field="model" :header="$t('model')" style="min-width: 12rem">
          <template #body="{ data: vehicle }"> <!-- Cambiamos 'data' a 'vehicle' -->
            {{ vehicle.model }} <!-- Usamos 'vehicle' aquí -->
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <pv-input-text v-model="filterModel.value" type="text" @input="filterCallback()" :placeholder="$t('searchByModel')" />
          </template>
        </pv-column>

        <!-- Columna de Año -->
        <pv-column field="year" :header="$t('year')" style="min-width: 10rem">
          <template #body="{ data: vehicle }"> <!-- Cambiamos 'data' a 'vehicle' -->
            {{ vehicle.year }} <!-- Usamos 'vehicle' aquí -->
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <pv-input-text v-model="filterModel.value" type="number" @input="filterCallback()" :placeholder="$t('searchByYear')" />
          </template>
        </pv-column>

        <!-- Columna de Tarifa -->
        <pv-column field="rate" :header="$t('dailyRate')" style="min-width: 8rem">
          <template #body="{ data: vehicle }"> <!-- Cambiamos 'data' a 'vehicle' -->
            {{ vehicle.rate }} <!-- Usamos 'vehicle' aquí -->
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <pv-input-text v-model="filterModel.value" type="number" @input="filterCallback()" :placeholder="$t('searchByRate')" />
          </template>
        </pv-column>

        <!-- Columna de Button para hacer el request -->
        <pv-column :header="$t('request')" style="min-width: 8rem">
          <template #body="{ data: vehicle }"> <!-- Aquí estamos usando 'vehicle' -->
            <pv-button @click="requestForm(vehicle.id)">{{$t('request')}}</pv-button>
          </template>
        </pv-column>

        <!-- Columna de Button para hacer view vehicle -->
        <pv-column :header="$t('details')" style="min-width: 8rem">
          <template #body="{ data: vehicle }"> <!-- Aquí estamos usando 'vehicle' -->
            <pv-button icon="pi pi-eye" @click="detailsVehicle(vehicle.id)"/>
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services';
import { useRouter } from 'vue-router'

const tenantService = new TenantApiServices();
const vehicles = ref([]); // Arreglo para almacenar los vehículos filtrados
const loading = ref(true); // Estado de carga
const router = useRouter();
const loggedInUserId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado desde el localStorage

const filters = ref({
  global: { value: null},
  brand: { value: null },
  model: { value: null },
  year: { value: null },
  rate: { value: null }
});

const requestForm = (car_id) => {
  console.log("car_id",car_id);
  router.push({ name: 'RequestForm', params: { id: car_id } });
};

const detailsVehicle = (car_id) => {
  console.log("car_id",car_id);
  router.push({ name: 'FiltersDetails', params: { id: car_id } });
};

// Función para obtener todos los vehículos excepto los del propietario
const fetchNonOwnerVehicles = async () => {
  try {
    const ownersResponse  = await tenantService.getAllOwners();
    const foundOwner  = ownersResponse.data.find(o => o.owner_id === loggedInUserId);

    const vehiclesResponse = await tenantService.getAllVehicles();
    // Filtrar los vehículos que no están en el arreglo de `foundOwner.vehicles`
    if (foundOwner) {
      vehicles.value = vehiclesResponse.data.filter(
        vehicle => !foundOwner.vehicles.includes(vehicle.id)
      );
    } else {
      vehicles.value = vehiclesResponse.data; // Mostrar todos los vehículos si no hay propietario
    }
  } catch (error) {
    console.error("Error al obtener los vehículos:", error);
  } finally {
    loading.value = false; // Desactiva el estado de carga
    console.log("Vehículos no pertenecientes al propietario:", vehicles.value);
  }
};

onMounted(fetchNonOwnerVehicles);

</script>

<style scoped>
.card{
  width: 95vw;
}
.title{
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  width: 100%;
}
.filter{
  width: 100%;
}
</style>