<!-- src/components/VehicleForm.vue -->
<template>
  <div>
    <h1>{{ $t('addNewVehicle') }}</h1>
    <form @submit.prevent="submitForm">
      <div class="p-fluid">
        <div class="p-field">
          <label for="brand">{{ $t('brand') }}</label>
          <InputText
              id="brand"
              v-model="vehicle.brand"
              required
              aria-label="Marca del vehículo"
          />
        </div>
        <div class="p-field">
          <label for="model">{{ $t('model') }}</label>
          <InputText
              id="model"
              v-model="vehicle.model"
              required
              aria-label="Modelo del vehículo"
          />
        </div>
        <div class="p-field">
          <label for="year">{{ $t('year') }}</label>
          <InputNumber
              id="year"
              v-model="vehicle.year"
              :min="1900"
              :max="new Date().getFullYear()"
              required
              aria-label="Año del vehículo"
          />
        </div>
        <div class="p-field">
          <label for="rate">{{ $t('ratePerHour') }}</label>
          <InputNumber
              id="rate"
              v-model="vehicle.rate"
              mode="currency"
              currency="USD"
              required
              aria-label="Tarifa por hora"
          />
        </div>
        <div class="p-field">
          <label for="description">{{ $t('description') }}</label>
          <textarea
              id="description"
              v-model="vehicle.description"
              required
              aria-label="Descripción del vehículo"
              class="p-inputtext p-component"
          ></textarea>
        </div>

        <div class="p-field">
          <label>{{ $t('uploadImages') }}</label>
          <FileUpload
              multiple
              customUpload
              :uploadHandler="onUpload"
              :auto="true"
              :previewWidth="100"
              accept="image/*"
              aria-label="Subir imágenes del vehículo"
          />
          <div class="image-preview" v-if="vehicle.images.length">
            <div
                v-for="(image, index) in vehicle.images"
                :key="index"
                class="p-mr-2"
            >
              <img :src="image" alt="Vehicle Image" width="100" />
            </div>
          </div>
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
  name: 'VehicleForm',
  data() {
    return {
      vehicle: {
        brand: '',
        model: '',
        year: null,
        rate: null,
        description: '',
        images: [],
      },
    };
  },
  methods: {
    submitForm() {
      axios
          .post('http://localhost:3000/vehicles', this.vehicle)
          .then(() => {
            this.$toast.add({
              severity: 'success',
              summary: this.$t('successAdd'),
            });
            this.$router.push({ name: 'VehicleList' });
          })
          .catch((error) => {
            console.error(error);
            this.$toast.add({ severity: 'error', summary: this.$t('error') });
          });
    },
    onUpload(event) {
      const files = event.files;
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.vehicle.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.image-preview {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}
</style>
