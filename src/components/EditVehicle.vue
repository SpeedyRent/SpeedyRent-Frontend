<!-- src/components/EditVehicle.vue -->
<template>
  <div>
    <h1>{{ $t('editVehicle') }}</h1>
    <form @submit.prevent="submitForm">
      <div class="p-fluid">
        <div class="p-field">
          <label for="rate">{{ $t('ratePerHour') }}</label>
          <InputNumber
              id="rate"
              v-model="vehicle.rate"
              mode="currency"
              currency="USD"
              required
              aria-label="Modificar tarifa por hora"
          />
        </div>
        <div class="p-field">
          <label for="description">{{ $t('description') }}</label>
          <textarea
              id="description"
              v-model="vehicle.description"
              required
              aria-label="Modificar descripción del vehículo"
              class="p-inputtext p-component"
          ></textarea>
        </div>

        <Button
            type="submit"
            label="{{ $t('saveChanges') }}"
            icon="pi pi-check"
            aria-label="Guardar cambios"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditVehicle',
  data() {
    return {
      vehicle: {
        rate: null,
        description: '',
      },
    };
  },
  methods: {
    fetchVehicle() {
      axios
          .get(`http://localhost:3000/vehicles/${this.$route.params.id}`)
          .then((response) => {
            this.vehicle = response.data;
          })
          .catch((error) => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: this.$t('error') });
          });
    },
    submitForm() {
      axios
          .put(
              `http://localhost:3000/vehicles/${this.$route.params.id}`,
              this.vehicle
          )
          .then(() => {
            this.$toast.add({
              severity: 'success',
              summary: this.$t('successEdit'),
            });
            this.$router.push({
              name: 'VehicleDetails',
              params: { id: this.$route.params.id },
            });
          })
          .catch((error) => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: this.$t('error') });
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
