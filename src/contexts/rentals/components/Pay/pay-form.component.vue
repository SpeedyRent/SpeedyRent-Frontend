<template>
  <div class="title">
    <h2>{{$t('selectMethod')}}</h2>
  </div>
  <div class="semigeneral">
    <div class="selection">
      <div v-for="category in categories" :key="category.key" class="items">
        <div class="button-container">
          <pv-radio-button
            v-model="selectedCategory"
            :inputId="category.key"
            name="dynamic"
            :value="category.name"
            @change="handleSelectionChange" />
          <img
            :src="category.image"
            :alt="category.name"
            class="image-category"
            @click="selectedCategory = category.name" />
        </div>
      </div>
    </div>
    <div v-if="request" class="mount">
      <p class="total-text">{{$t('totalAmount')}}: {{ request.total_mount }}</p>
    </div>
    <div v-else>
      <p>{{$t('notMount')}}</p>
    </div>
    <div class="card">
      <div class="buttonshow">
        <pv-button
          :label="$t('keepUp')"
          @click="openDialog"
          :disabled="!isShowButtonEnabled" />
      </div>
      <pv-dialog v-model:visible="visibleVisa" modal header="Visa" :style="{ width: '25rem'}">
        <div style="padding: 10px">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">{{$t('UpdateVisa')}}</span>
        </div>
        <div class="dialogItem">
          <label for="names" class="font-semibold w-24">{{$t('nameHolder')}}</label>
          <pv-input-text id="names" v-model="value1" class="flex-auto" autocomplete="off" />
        </div>
        <div class="dialogItem">
          <label for="target" class="font-semibold w-24">{{$t('cardNumber')}}</label>
          <pv-input-mask id="target" v-model="value2" variant="filled" mask="9999 9999 9999 9999" autocomplete="off"/>
        </div>
        <div class="dialogItem">
          <label for="Expiration" class="font-semibold w-24">{{$t('expirationDate')}}</label>
          <pv-input-mask id="Expiration" v-model="value3" variant="filled" mask="99/99" autocomplete="off"/>
        </div>
        <div class="dialogItem">
          <label for="security" class="font-semibold w-24">{{$t('cvc')}}</label>
          <pv-input-mask id="security" v-model="value4" variant="filled" mask="9 9 9" autocomplete="off"/>
        </div>
        <div class="botones">
          <pv-button type="button" :label="$t('cancel')" severity="secondary" @click="closeDialog('Visa')"></pv-button>
          <pv-button type="button" :label="$t('pay')" @click="handlePayment('Visa')" :loading="loading"></pv-button>
        </div>
      </pv-dialog>

      <pv-dialog v-model:visible="visibleYape" modal :header="$t('qrYape')" :style="{ width: '25rem'}">
        <div style="padding: 10px">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">{{$t('UpdateYape')}}</span>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <img src="https://acj.org.pe/wp-content/uploads/2021/11/IMG-20211125-WA0029-1-212x300.jpg" style="width: 150px">
        </div>
        <div class="botones">
          <pv-button type="button" :label="$t('cancel')" severity="secondary" @click="closeDialog('Yape')"></pv-button>
          <pv-button type="button" :label="$t('pay')" @click="handlePayment('Yape')" :loading="loading"></pv-button>
        </div>
      </pv-dialog>

      <pv-dialog v-model:visible="visiblePlin" modal :header="$t('qrPlin')" :style="{ width: '25rem'}">
        <div style="padding: 10px">
          <span class="text-surface-500 dark:text-surface-400 block mb-8">{{$t('UpdatePlin')}}</span>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <img src="https://pbs.twimg.com/media/E6tZDRXWEAA3OqU.jpg:large" style="width: 300px">
        </div>
        <div class="botones">
          <pv-button type="button" :label="$t('cancel')" severity="secondary" @click="closeDialog('Plin')"></pv-button>
          <pv-button type="button" :label="$t('pay')" @click="handlePayment('Plin')" :loading="loading"></pv-button>
        </div>
      </pv-dialog>
      <pv-toast />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { defineProps } from 'vue';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js'
import { useToast } from 'primevue/usetoast';

const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
const value4 = ref(null);
const loading = ref(false);

const request = ref(null);
const tenantApiServices = new TenantApiServices();
const visibleVisa = ref(false);
const visibleYape = ref(false);
const visiblePlin = ref(false);
const selectedCategory = ref('');
const categories = ref([
  { name: 'Visa', key: 'V', image: 'https://milionarioz.com.br/wp-content/uploads/2022/05/visa-logo-5.png' },
  { name: 'Yape', key: 'Y', image: 'https://marketing-peru.beglobal.biz/wp-content/uploads/2024/06/1-yape-logo-transparencia-2-300x300.png' },
  { name: 'Plin', key: 'P', image: 'https://marketing-peru.beglobal.biz/wp-content/uploads/2024/09/logo-plin-fondo-transparente.png' }
]);

const props = defineProps({
  requestId: {
    type: String,
    required: true
  }
});

const isShowButtonEnabled = computed(() => selectedCategory.value !== '');

watch(() => props.requestId, (newRequestId) => {
  if (newRequestId) {
    fetchOwnerVehicles();
  }
});

const fetchOwnerVehicles = async () => {
  try {
    const dataRequest = await tenantApiServices.getRequestById(props.requestId);
    if (dataRequest && dataRequest.data) {
      request.value = dataRequest.data;
    }else {
      console.warn("La respuesta no contiene los datos esperados.");
    }
  } catch (error) {
    console.error("Error al obtener los datos de request:", error);
  }
};

fetchOwnerVehicles();

const openDialog = () => {
  visibleVisa.value = selectedCategory.value === 'Visa';
  visibleYape.value = selectedCategory.value === 'Yape';
  visiblePlin.value = selectedCategory.value === 'Plin';
};

const closeDialog = (type) => {
  if (type === 'Visa') visibleVisa.value = false;
  if (type === 'Yape') visibleYape.value = false;
  if (type === 'Plin') visiblePlin.value = false;
};

const toast = useToast();

const handlePayment = async (type) => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  loading.value = false;
  closeDialog(type);
  toast.add({ severity: 'success', summary: 'Éxito', detail: 'Pago exitoso' });
};

</script>

<style scoped>
.title{
  font-weight: bold;
  font-size: 20px;
  align-items: center;
  padding: 20px;
  color: #cf0d2a;
}
.image-category {
  width: 50px;
  height: auto;
  margin-left: 10px;
}
img {
  width: 80px;
  height: auto;
}
.selection {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  margin: 20px 0;
}
.items{
  align-items: center;
  display: flex;
}
.card{
  justify-items: center;
}
.dialogItem{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
}
.botones{
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 20px;
}
.buttonshow{
  display: flex;
  padding: 5px;
  justify-content: end;
}
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.mount {
  display: flex;
  justify-content: center;
  color: green;
  font-size: 20px;
  margin: 20px 0;
}
.semigeneral{
  padding: 15px;
}
.total-text {
  text-align: center; /* Asegura que el texto esté centrado */
}
</style>
