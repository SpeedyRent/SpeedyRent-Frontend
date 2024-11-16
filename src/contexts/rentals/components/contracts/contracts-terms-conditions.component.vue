<template>
  <div class="card">
    <div>
      <h2>{{$t('TermsConditionsTenant')}}</h2>
    </div>
    <pv-accordion value="0" class="accordion">
      <pv-accordion-panel value="0">
        <pv-accordion-header>{{$t('LiabilityDamages')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('tenant1')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
      <pv-accordion-panel value="1">
        <pv-accordion-header>{{$t('TrafficPenalties')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('tenant2')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
      <pv-accordion-panel value="2">
        <pv-accordion-header>{{$t('ReturnVehicleTime')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('tenant3')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
      <pv-accordion-panel value="3">
        <pv-accordion-header>{{$t('LossVehicle')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('tenant4')}}</p>
        </pv-accordion-content>
      </pv-accordion-panel>
      <pv-accordion-panel value="4">
        <pv-accordion-header>{{$t('TermsUse')}}</pv-accordion-header>
        <pv-accordion-content>
          <p class="m-0">{{$t('tenant5')}}</p>
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
});
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
