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
            <ContractsTermsConditions v-model="isChecked" /> <!-- Pasamos el estado del checkbox -->
          </div>
          <div class="botonNext" style="display: flex; justify-content: flex-end;">
            <pv-button :label="$t('next')" icon="pi pi-arrow-right" @click="activateCallback('2')" :disabled="!isChecked" />
          </div>
        </pv-step-panel>
        <pv-step-panel v-slot="{ activateCallback }" value="2">
          <div class="ConteinerII">
            <PayForm :requestId="someRequestId"/>
          </div>
          <div class="botones" style="display: flex; justify-content: space-between; width: 100%;">
            <pv-button :label="$t('back')" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" style="margin-right: auto;"/>
            <pv-button :label="$t('finish')" @click="finishContract" style="margin-left: auto;"/>
          </div>
        </pv-step-panel>
      </pv-step-panels>
    </pv-stepper>
  </div>
</template>

<script setup>
import PayForm from '@/contexts/rentals/components/Pay/pay-form.component.vue'
import ContractsTermsConditions from '@/contexts/rentals/components/contracts/contracts-terms-conditions.component.vue'
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter();
const route = useRoute();
const requestId = ref(route.params.id);
const tenantApiServices = new TenantApiServices();
const request = ref(null);
const isChecked = ref(false); // Agregamos el estado del checkbox

const someRequestId = requestId.value;
console.log("id que pasara al otro componente",someRequestId)

const finishContract = async () => {
  const dataRequest = await tenantApiServices.getRequestById(requestId.value);
  request.value = dataRequest.data;
  request.value.contract = "Approved";
  await tenantApiServices.updateTenantDates(request.value.id, { contract: request.value.contract }); // Actualiza en la API
  router.push({name:'RequestTable'});
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