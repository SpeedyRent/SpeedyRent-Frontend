<template>
  <div class="card flex justify-center">
    <label for="dates" class="font-bold block mb-2">{{$t('date')}}</label>
    <pv-datepicker v-model="dates" selectionMode="range" :manualInput="false" showIcon fluid />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits( ['update:daysTotal', 'update:startDate', 'update:endDate'] );
const dates = ref([]);

const formattedStartDate = computed(() => dates.value[0] ? new Date(dates.value[0]).toLocaleDateString() : 'No seleccionada');
const formattedEndDate = computed(() => dates.value[1] ? new Date(dates.value[1]).toLocaleDateString() : 'No seleccionada');

const daysDifference = computed(() => {
  if (dates.value[0] && dates.value[1]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Emitir el evento cuando cambia daysDifference
watch(daysDifference, (newDays) => {
  emit('update:daysTotal', newDays); // Emitimos el nuevo valor
  emit('update:startDate', formattedStartDate.value); // Emitir fecha de inicio
  emit('update:endDate', formattedEndDate.value); // Emitir fecha de fin
});

// Emitir fechas cuando se seleccionan
watch(dates, () => {
  emit('update:startDate', formattedStartDate.value);
  emit('update:endDate', formattedEndDate.value);
});
</script>

<style scoped>

</style>