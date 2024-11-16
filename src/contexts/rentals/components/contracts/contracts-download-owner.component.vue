<template>
  <div>
    <div ref="content" id="content">
      <div class="titule">
        <h2>{{$t('contractTitle')}}</h2>
      </div>
      <div class="parrafo">
        <p>{{$t('paragraph1')}}<strong>{{ userOwner?.name }}</strong>, {{$t('dni')}}: <strong>{{ userOwner?.dni }}</strong>, {{$t('paragraph2')}}
          <strong>{{ vehicle?.brand }}</strong>, {{$t('model')}}: <strong>{{ vehicle?.model }}</strong>,
          {{$t('paragraph3')}}: <strong>{{ vehicle?.year }}</strong>, {{$t('location')}} <strong>{{ vehicle?.location }}</strong>,
          {{$t('paragraph4')}} <strong>{{ userTenant?.name }}</strong>, {{$t('dni')}}: <strong>{{ userTenant?.dni }}</strong>.
          {{$t('paragraph5')}} <strong>{{ vehicle?.rate }}</strong> soles.
          {{$t('paragraph6')}} <strong>{{ userOwner?.phone }}</strong> {{$t('paragraph7')}}: <strong>{{ userOwner?.email }}</strong>, {{$t('paragraph8')}}
          <strong>{{ userTenant?.phone }}</strong> {{$t('paragraph7')}}: <strong>{{ userTenant?.email }}</strong>.
        </p>
      </div>
      <div class="contenido">
        <h3><strong>{{$t('conditionsTitle')}}</strong></h3>
        <ul type="A">
          <li><strong>{{$t('durationTitle')}}</strong>
            <p>{{$t('contract1')}}<strong>{{ request?.total_days }}</strong> {{$t('days')}}, {{$t('from')}} <strong>{{ request?.from }}</strong> {{$t('to')}} <strong>{{ request?.to }}</strong>.
            </p>
          </li>

          <li><strong>{{$t('totalCostTitle')}}</strong>
            <p>{{$t('contract2')}}<strong>{{ request?.total_mount }}</strong> soles, {{$t('contract2part')}}.
            </p>
          </li>

          <li><strong>{{$t('pickUpReturnTitle')}}</strong>
            <p>{{$t('pickUpTime')}}: <strong>{{ request?.pick_up_time }}</strong><br>
              {{$t('returnTime')}}: <strong>{{ request?.return_time }}</strong>
            </p>
          </li>

          <li><strong>{{$t('tenantObligationsTitle')}}</strong>
            <p>{{$t('contract4')}}</p>
          </li>

          <li><strong>{{$t('lessorObligationsTitle')}}</strong>
            <p>{{$t('contract5')}}</p>
          </li>

          <li><strong>{{$t('deliveryConditionsTitle')}}</strong>
            <p>{{$t('contract6')}}</p>
          </li>

        </ul>
      </div>
    </div>
    <div class="buttons">
      <pv-button :label="$t('back')" @click="back" />
      <pv-button :label="$t('Download')" @click="downloadPDF" />
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import html2pdf from 'html2pdf.js';
import { useRoute } from 'vue-router'
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js'
import router from '@/router.js'

const tenantApiServices = new TenantApiServices();
const route = useRoute();
const requestId = ref(route.params.id);
const request = ref(null);
const userTenant = ref(null);
const userOwner = ref(null);
const vehicle = ref(null);
const loggedInUserId = localStorage.getItem('userId');

const fetchData = async () => {
  try {
    const requestResponse = await tenantApiServices.getRequestById(requestId.value);
    request.value = requestResponse.data;
    console.log("id del vehiculo", request.value.car_id);

    const userResponseOwner = await tenantApiServices.getUserById(loggedInUserId);
    userOwner.value = userResponseOwner.data;

    const vehicleResponse = await tenantApiServices.getVehicleById(request.value.car_id);
    vehicle.value = vehicleResponse.data;

    const tenantResponse = await tenantApiServices.getAllTenants();
    const foundTenant = tenantResponse.data.find((tenant) =>
      tenant.request.includes(request.value.id)
    );

    const userResponseTenant = await tenantApiServices.getUserById(foundTenant.tenant_id);
    userTenant.value = userResponseTenant.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

const downloadPDF = () => {
  const element = document.getElementById('content');

  const options = {
    margin: 1,
    filename: 'contrato_alquiler.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generar y descargar el PDF
  html2pdf()
    .from(element)
    .set(options)
    .save();
};

const back = () =>{
  router.push({ path: '/requestTable'});
};

</script>

<style scoped>
.titule{
  color: darkred;
  font-size: 25px;
  text-align: center;
  padding: 15px;
}
.parrafo{
  padding: 0 30px;
  text-align: justify;
}
.contenido{
  padding: 10px 20px;
}

h3{
  padding: 10px;
  color: #316829;
}

li{
  padding: 5px;
}

strong {
  font-weight: bold !important;
}

.buttons {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

</style>
