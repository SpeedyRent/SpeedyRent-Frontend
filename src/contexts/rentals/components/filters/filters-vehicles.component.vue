<template>
  <div class="card">
    <div class="title">
      <p>{{$t('search')}}</p>
    </div>
    <div class="filter">
      <pv-data-table v-model:filters="filters" :value="vehicles" paginator :rows="5" dataKey="id" filterDisplay="row" :loading="loading"
                     :globalFilterFields="['brand', 'model', 'year', 'rate']">
        <template #empty> {{$t('thereIsNoRegisteredVehicle')}} </template>
        
        <pv-column :header="$t('images')" style="min-width: 12rem">
          <template #body="{ data: vehicle }">
            <img v-if="vehicle.photos && vehicle.photos.length"
                 :src="vehicle.photos[0]"
                 alt="Vehicle photo"
                 style="width: 100px; height: 60px;" />
            <span v-else>No image</span>
          </template>
        </pv-column>
        <pv-column field="brand" :header="$t('brand')" style="min-width: 12rem">
          <template #body="{ data: vehicle }">
            {{ vehicle.brand }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <pv-input-text v-model="filterModel.value" type="text" @input="filterCallback()" :placeholder="$t('searchByBrand')" />
          </template>
        </pv-column>
        <pv-column field="model" :header="$t('model')" style="min-width: 12rem">
          <template #body="{ data: vehicle }">
            {{ vehicle.model }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <pv-input-text v-model="filterModel.value" type="text" @input="filterCallback()" :placeholder="$t('searchByModel')" />
          </template>
        </pv-column>

        <pv-column field="year" :header="$t('year')" style="min-width: 10rem">
          <template #body="{ data: vehicle }">
            {{ vehicle.year }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <pv-input-text v-model="filterModel.value" type="number" @input="filterCallback()" :placeholder="$t('searchByYear')" />
          </template>
        </pv-column>

        <pv-column field="rate" :header="$t('dailyRate')" style="min-width: 8rem">
          <template #body="{ data: vehicle }">
            {{ vehicle.rate }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <pv-input-text v-model="filterModel.value" type="number" @input="filterCallback()" :placeholder="$t('searchByRate')" />
          </template>
        </pv-column>

        <pv-column :header="$t('request')" style="min-width: 8rem">
          <template #body="{ data: vehicle }">
            <pv-button @click="requestForm(vehicle.id)">{{$t('request')}}</pv-button>
          </template>
        </pv-column>

        <pv-column :header="$t('details')" style="min-width: 8rem">
          <template #body="{ data: vehicle }">
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
const vehicles = ref([]);
const loading = ref(true);
const router = useRouter();
const loggedInUserId = localStorage.getItem('userId');

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

const fetchNonOwnerVehicles = async () => {
  try {
    const ownersResponse  = await tenantService.getAllOwners();
    const foundOwner  = ownersResponse.data.find(o => o.owner_id === loggedInUserId);

    const vehiclesResponse = await tenantService.getAllVehicles();
    if (foundOwner) {
      vehicles.value = vehiclesResponse.data.filter(
        vehicle => !foundOwner.vehicles.includes(vehicle.id)
      );
    } else {
      vehicles.value = vehiclesResponse.data;
    }
  } catch (error) {
    console.error("Error al obtener los vehículos:", error);
  } finally {
    loading.value = false;
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
