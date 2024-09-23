<template>
  <div class="form">
    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Request Details</h2>
    <div class="calendar">
      <RequestCalendar
        ref="calendar"
        @update:daysTotal="updateDaysTotal"
        @update:startDate="updateStartDate"
        @update:endDate="updateEndDate"
      />
    </div>
    <div class="Time">
      <RequestTime ref="requestTime" />
    </div>
    <div class="price">
      <RequestPrice ref="requestPrice" />
    </div>
    <div class="buttonContainer">
      <div class="buttonSave">
        <pv-button
          type="button"
          label="Save"
          :loading="loading"
          @click="handleButtonClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RequestCalendar from '@/contexts/learning/components/form/request-calendar.component.vue';
import RequestTime from '@/contexts/learning/components/form/request-time.component.vue';
import RequestPrice from '@/contexts/learning/components/form/request-price.component.vue';
import { TenantApiServices } from '@/contexts/learning/services/tenant-api.services.js';
import router from '@/router.js'


const loading = ref(false);
const tenantApi = new TenantApiServices();
const tenantId = '137c';
const requestPrice = ref(null);
const requestTime = ref(null);

// Variables para las fechas y total de días
const startDate = ref('');
const endDate = ref('');
const totalDays = ref(0); // Variable para total de días

const updateDaysTotal = (days) => {
  totalDays.value = days; // Actualiza totalDays
  if (requestPrice.value) {
    requestPrice.value.updateDaysTotal(days); // Llama a la función para actualizar daysTotal en RequestPrice
  }
};

const updateStartDate = (date) => {
  startDate.value = date;
};

const updateEndDate = (date) => {
  endDate.value = date;
};

const handleButtonClick = async () => {
  loading.value = true;

  await load();

  const updatedData = {
    from: startDate.value,
    to: endDate.value,
    total_days: totalDays.value || 0, // Asegúrate de que totalDays se esté usando
    total_mount: requestPrice.value?.priceFinish || 0,
    pick_up_time: requestTime.value?.pick_up_time ? new Date(requestTime.value.pick_up_time).toLocaleTimeString() : '',
    return_time: requestTime.value?.return_time ? new Date(requestTime.value.return_time).toLocaleTimeString() : '',
  };

  console.log('Datos a enviar:', updatedData); // Verifica los datos

  await updateDates(updatedData);

  loading.value = false;

  //cambios para que el id para a la tabla
  router.push({ path: '/request', query: { id: tenantId } });
};

const load = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const updateDates = async (updatedData) => {
  try {
    await tenantApi.updateTenantDates(tenantId, updatedData);
    console.log('Datos enviados con éxito:', updatedData);
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }
};
</script>

<style scoped>

h2 {
  font-size: 2rem; /* Tamaño base */
  color:#2c3e50;
}

@media (min-width: 768px) {
  h2 {
    font-size: 3rem; /* Tamaño para pantallas medianas */
  }
}

@media (min-width: 1024px) {
  h2 {
    font-size: 4rem; /* Tamaño para pantallas grandes */
  }
}

.form {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.calendar {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.Time {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.price {
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.buttonContainer {
  display: flex;
  gap: 10px;
}

.buttonSave{
  flex: 1;
  padding: 10px;
}

</style>