<template>
  <div class="user-profile">
    <div class="User">
      <h2>{{$t('userProfile')}}</h2>
      <img :src="userTenant.photo_user" alt="Foto de perfil" class="profile-photo" />
      <h3>{{ userTenant.name }}</h3>
    </div>
    <div class="profile-container">
      <div class="profile-info">
        <h4>{{$t('generalInformation')}}</h4>
        <p>{{$t('email')}}: <input type="email" v-model="userTenant.email" /></p>
        <p>{{$t('phone')}}: <input type="text" v-model="userTenant.phone" /></p>
        <pv-button @click="updateProfile">{{$t('update')}}</pv-button>
      </div>

      <div class="security">
        <h4>{{$t('security')}}</h4>
        <input type="password" v-model="newPassword" :placeholder="$t('newPassword')" />
        <input type="password" v-model="confirmPassword" :placeholder="$t('confirmPassword')" />
        <pv-button @click="changePassword">{{$t('update')}}</pv-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js'

const tenantApiServices = new TenantApiServices()
const loggedInUserId = localStorage.getItem('userId')
const userTenant = ref(null)
const newPassword = ref('')
const confirmPassword = ref('')

// Función para obtener el perfil del usuario
const fetchUserProfile = async () => {
  const userResponse = await tenantApiServices.getUserById(loggedInUserId)
  userTenant.value = userResponse.data
}

// Inicializar el perfil del usuario
fetchUserProfile()

const updateProfile = async () => {
  try {
    await tenantApiServices.updateUser(loggedInUserId, userTenant.value)
    alert('Información actualizada correctamente.')
  } catch (error) {
    console.error('Error al actualizar la información:', error)
  }
}

const changePassword = async () => {
  if (newPassword.value === confirmPassword.value) {
    userTenant.value.password = newPassword.value // Actualizar la contraseña en el objeto del usuario
    try {
      await tenantApiServices.updateUser(loggedInUserId, userTenant.value)
      alert('Contraseña cambiada correctamente.')
      newPassword.value = ''
      confirmPassword.value = ''
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error)
      alert('Hubo un error al cambiar la contraseña.')
    }
  } else {
    alert('Las contraseñas no coinciden.')
  }
}
</script>

<style scoped>
.user-profile {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  height: 95%;
  width: 90%;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.profile-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  height: 60%;
}

.profile-info,
.security {
  flex: 1;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  background-color: #f9f9f9;
}

.profile-photo {
  display: block;
  margin: 0 auto 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

h3,
h4 {
  font-size: 18px;
  color: #444;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

input[type='email'],
input[type='text'],
input[type='password'] {
  width: calc(100% - 20px);
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

pv-button {
  width: 100%;
  font-size: 14px;
}
</style>