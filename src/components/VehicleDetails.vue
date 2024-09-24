<template>
  <div v-if="vehicle">
    <h1>{{ vehicle.brand }} {{ vehicle.model }}</h1>
    <p>{{ $t('year') }}: {{ vehicle.year }}</p>
    <p>{{ $t('ratePerHour') }}: ${{ vehicle.rate }}</p>
    <p>{{ $t('description') }}: {{ vehicle.description }}</p>
    <Button
        :label="$t('editVehicle')"
        icon="pi pi-pencil"
        @click="goToEditVehicle"
        aria-label="Editar vehículo"
    />
    <Button
        :label="$t('deleteVehicle')"
        icon="pi pi-trash"
        class="p-button-danger"
        @click="confirmDelete"
        aria-label="Eliminar vehículo"
    />
  </div>
  <div v-else>
    <p>{{ $t('loading') }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VehicleDetails',
  data() {
    return {
      vehicle: null,
    };
  },
  methods: {
    fetchVehicle() {
      console.log('Obteniendo vehículo con ID:', this.$route.params.id);
      axios
          .get(`http://localhost:3000/vehicles/${this.$route.params.id}`)
          .then((response) => {
            console.log('Respuesta de la API:', response.data);
            this.vehicle = response.data;
          })
          .catch((error) => {
            console.error('Error al obtener el vehículo:', error);
            this.vehicle = null;
            this.$toast.add({severity: 'error', summary: this.$t('error')});
          });
    },
    goToEditVehicle() {
      this.$router.push({name: 'EditVehicle', params: {id: this.$route.params.id}});
    },
    confirmDelete() {
      this.$confirm.require({
        message: this.$t('confirmDelete'),
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: this.$t('confirm'),
        rejectLabel: this.$t('cancel'),
        accept: () => this.deleteVehicle(),
      });
    },
    deleteVehicle() {
      axios
          .delete(`http://localhost:3000/vehicles/${this.$route.params.id}`)
          .then(() => {
            this.$toast.add({
              severity: 'success',
              summary: this.$t('successDelete'),
            });
            this.$router.push({name: 'VehicleList'});
          })
          .catch((error) => {
            console.error('Error al eliminar el vehículo:', error);
            this.$toast.add({severity: 'error', summary: this.$t('error')});
          });
    },
  },
  mounted() {
    this.fetchVehicle();
  },
};
</script>

<style scoped>
</style>
