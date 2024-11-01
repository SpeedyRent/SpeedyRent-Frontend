<template>
  <div class="flex-auto">
    <label for="pick_up_time" class="font-bold block mb-2">{{$t('pickUpTime')}}</label>
    <pv-datepicker v-model="pick_up_time" showIcon fluid iconDisplay="input" timeOnly inputId="pick_up_time">
      <template #inputicon="slotProps">
        <i class="pi pi-clock" @click="slotProps.clickCallback" />
      </template>
    </pv-datepicker>
  </div>
  <div class="flex-auto">
    <label for="return_time" class="font-bold block mb-2">{{$t('returnTime')}}</label>
    <pv-datepicker v-model="return_time" showIcon fluid iconDisplay="input" timeOnly inputId="return_time">
      <template #inputicon="slotProps">
        <i class="pi pi-clock" @click="slotProps.clickCallback" />
      </template>
    </pv-datepicker>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const pick_up_time = ref();
const return_time = ref();

const formattedPickUpTime = computed(() => {
  return pick_up_time.value ? new Date(pick_up_time.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No seleccionada';
});

const formattedReturnTime = computed(() => {
  return return_time.value ? new Date(return_time.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No seleccionada';
});

// Exponer las variables
defineExpose({ pick_up_time, return_time, formattedPickUpTime, formattedReturnTime });
</script>

<style scoped>

</style>