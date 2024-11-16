<template>
  <div class="card">
    <div>
      <h2>{{$t('TermsConditionsOwner')}}</h2>
    </div>
    <pv-accordion value="0" class="accordion">
      <pv-accordion-panel value="0">
        <pv-accordion-header>{{$t('DeclarationAuthorization')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('owner1')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
      <pv-accordion-panel value="1">
        <pv-accordion-header>{{$t('VehicleConditions')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('owner2')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
      <pv-accordion-panel value="2">
        <pv-accordion-header>{{$t('InsuranceCoverage')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('owner3')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
      <pv-accordion-panel value="3">
        <pv-accordion-header>{{$t('LiabilityTheft')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('owner4')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
      <pv-accordion-panel value="4">
        <pv-accordion-header>{{$t('PostRental')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('owner5')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
    </pv-accordion>
    <div class="check">
      <pv-checkbox v-model="isChecked" :binary="true" inputId="terms" />
      <label for="terms" class="checkbox-label">{{$t('acceptTerms')}}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps(['modelValue']);
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits();

const isChecked = ref(props.modelValue);

watch(isChecked, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  isChecked.value = newValue;
});;
</script>

<style scoped>
.accordion{
  width: 100%;
}
h2{
  font-size: 30px;
  color: #cf0d2a;
}
.check{
  color:green;
  padding: 20px;
}
.checkbox-label {
  margin-left: 8px;
}
</style>
