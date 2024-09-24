<template>
  <div>
    <h1>{{ $t('vehiclesAvailable') }}</h1>
    <Button
        :label="$t('addNewVehicle')"
        icon="pi pi-plus"
        @click="goToAddVehicle"
        aria-label="Agregar nuevo vehículo"
    />

    <DataTable :value="vehicles" responsiveLayout="scroll">
      <Column field="brand" :header="$t('brand')"></Column>
      <Column field="model" :header="$t('model')"></Column>
      <Column header="Acciones" style="width: 150px">
        <template #body="slotProps">
          <div>
            <Button
                icon="pi pi-eye"
                class="p-button-text"
                @click="viewDetails(slotProps.data.id)"
                aria-label="Ver detalles"
            />
            <Button
                icon="pi pi-trash"
                class="p-button-text"
                @click="confirmDelete(slotProps.data)"
                aria-label="Eliminar vehículo"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VehicleList',
  data() {
    return {
      vehicles: [],
    };
  },
  methods: {
    fetchVehicles() {
      axios
          .get('http://localhost:3000/vehicles')
          .then((response) => {
            this.vehicles = response.data;
          })
          .catch((error) => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: this.$t('error') });
          });
    },
    goToAddVehicle() {
      this.$router.push({ name: 'AddVehicle' });
    },
    viewDetails(id) {
      this.$router.push({ name: 'VehicleDetails', params: { id } });
    },
    confirmDelete(vehicle) {
      this.$confirm.require({
        message: this.$t('confirmDelete'),
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: this.$t('confirm'),
        rejectLabel: this.$t('cancel'),
        accept: () => this.deleteVehicle(vehicle.id),
      });
    },
    deleteVehicle(id) {
      axios
          .delete(`http://localhost:3000/vehicles/${id}`)
          .then(() => {
            this.fetchVehicles();
            this.$toast.add({
              severity: 'success',
              summary: this.$t('successDelete'),
            });
          })
          .catch((error) => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: this.$t('error') });
          });
    },
  },
  mounted() {
    this.fetchVehicles();
  },
};
</script>

<style scoped>
</style>
