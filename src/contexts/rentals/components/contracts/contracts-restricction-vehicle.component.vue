<template>
  <div class="principal">
    <pv-stepper value="1" linear class="basis-[50rem]">
      <pv-step-list>
        <pv-step value="1">{{$t('passed')}} I</pv-step>
        <pv-step value="2">{{$t('passed')}} II</pv-step>
      </pv-step-list>
      <pv-step-panels>
        <pv-step-panel v-slot="{ activateCallback }" value="1">
          <div class="ConteinerI">
            <ContractsPregunts v-model="isChecked" />
          </div>
          <div class="botonNext" style="display: flex; justify-content: flex-end;">
            <pv-button :label="$t('next')" icon="pi pi-arrow-right" @click="activateCallback('2')" :disabled="!isChecked" />
          </div>
        </pv-step-panel>
        <pv-step-panel v-slot="{ activateCallback }" value="2">
          <div class="ConteinerII">
            <FormVehicle :triggerSubmit="triggerSubmit" />
          </div>
          <div class="botones" style="display: flex; justify-content: space-between; width: 100%;">
            <pv-button :label="$t('back')" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" style="margin-right: auto;"/>
            <pv-button :label="$t('finish')" iconPos="right" @click="submitFormFromFinish" style="margin-left: auto;"/>
          </div>
        </pv-step-panel>
      </pv-step-panels>
    </pv-stepper>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ContractsPregunts from '@/contexts/rentals/components/contracts/contracts-pregunts.component.vue'
import FormVehicle from '@/contexts/rentals/components/vehicles/form-vehicle.component.vue'
import { useRouter } from 'vue-router';

const triggerSubmit = ref(false);
const router = useRouter();
const isChecked = ref(false);

const submitFormFromFinish = () => {
  triggerSubmit.value = !triggerSubmit.value;
  router.push({name:'VehicleList'});
};

</script>

<style scoped>
.principal{
  width: 90%;
}
.ConteinerI{
  padding: 20px;
}

</style>
