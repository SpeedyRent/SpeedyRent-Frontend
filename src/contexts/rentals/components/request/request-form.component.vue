<template>
  <div class="form">
    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{{$t('requestDetails')}}</h2>
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
        <pv-button type="button" :label="$t('send')" :loading="loading" @click="handleButtonClick" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RequestCalendar from '@/contexts/rentals/components/request/request-calendar.component.vue'
import RequestTime from '@/contexts/rentals/components/request/request-time.component.vue'
import RequestPrice from '@/contexts/rentals/components/request/request-price.component.vue'
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js'
import router from '@/router.js'
import { useRoute } from 'vue-router'

const loading = ref(false)
const tenantApi = new TenantApiServices()
const requestPrice = ref(null)
const requestTime = ref(null)
let tenantId = ref('')

const startDate = ref('')
const endDate = ref('')
const totalDays = ref(0)

const route = useRoute()
const vehicleId = ref(route.params.id)

const updateDaysTotal = (days) => {
  totalDays.value = days
  if (requestPrice.value) {
    requestPrice.value.updateDaysTotal(days)
  }
}

const updateStartDate = (date) => {
  startDate.value = date
}

const updateEndDate = (date) => {
  endDate.value = date
}

const handleButtonClick = async () => {
  const vehicleData = await tenantApi.getVehicleById(vehicleId.value)
  const vehicle = vehicleData.data
  const firstPhotoUrl = vehicle.photos[0]

  const requestData = {
    car_id: vehicleId.value,
    photo_Car: firstPhotoUrl,
    from: startDate.value,
    to: endDate.value,
    total_days: totalDays.value || 0,
    total_mount: requestPrice.value?.priceFinish || 0,
    pick_up_time: requestTime.value?.pick_up_time
      ? new Date(requestTime.value.pick_up_time).toLocaleTimeString()
      : '',
    return_time: requestTime.value?.return_time
      ? new Date(requestTime.value.return_time).toLocaleTimeString()
      : '',
    status: 'Pendient',
    contract: 'Pendient'
  }

  const response = await tenantApi.createRequest(requestData)
  const newRequestId = response.data.id
  const loggedInUserId = localStorage.getItem('userId')

  const tenantsResponse = await tenantApi.getAllTenants()
  console.log('data del tenants', tenantsResponse.data)
  const foundTenant = tenantsResponse.data.find((o) => o.tenant_id === loggedInUserId)

  loading.value = true

  if (foundTenant) {
    foundTenant.request.push(newRequestId)

    const loggedInUserId = localStorage.getItem('userId')

    const updateData = {
      id: foundTenant.id,
      tenant_id: loggedInUserId,
      request: foundTenant.request
    }
    await tenantApi.updateTenantRequest(foundTenant.id, updateData)

    console.log('despues de estar en el owner id')
  }
  await load()

  console.log('from', startDate.value)

  loading.value = false

  router.push({ path: '/requestTable', query: { id: tenantId } })
}

const load = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
</script>

<style scoped>
h2 {
  font-size: 2rem;
  color: #2c3e50;
}

@media (min-width: 768px) {
  h2 {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  h2 {
    font-size: 4rem;
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

.buttonSave {
  flex: 1;
  padding: 10px;
}
</style>
