<template>
  <pv-card>
    <template #header>
      <h2>Perfil de Usuario</h2>
    </template>
    <div v-if="userData.first_name">
      <p><strong>Nombre:</strong> {{ userData.first_name }} {{ userData.last_name }}</p>
      <p><strong>Correo Electrónico:</strong> {{ userData.email }}</p>
      <img :src="userData.avatar" alt="Avatar" class="avatar" />
    </div>
    <div v-else>
      <p>Cargando datos del usuario...</p>
    </div>
  </pv-card>
</template>

<script>
import { AccountApiServices } from '@/contexts/learning/services/account-api.services';

export default {
  data() {
    return {
      userData: {},
      accountService: new AccountApiServices()
    };
  },
  async created() {
    await this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const userId = 2;
        console.log('Obteniendo datos del usuario...');

        const response = await this.accountService.getUserProfile(userId);

        console.log('Datos obtenidos del usuario:', response);


        if (response) {
          this.userData = response;
        } else {
          console.error('La respuesta no contiene datos de usuario');
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error.message);
      }
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 10px;
}
</style>
