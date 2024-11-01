<template>
  <div>
    <div class="welcome-section">
      <div class="imgWelcome">
        <img src="https://i.postimg.cc/TwHRHh4Z/image.png" alt="Welcome icon" class="welcome-icon" />
      </div>
      <div class="welcome">
        <h2>{{ $t('welcomeMessage') }}, {{ userDetails.name }} !!</h2>
      </div>
    </div>

    <div class="intro-section">
      <div class="paragraph">
        <p>{{ $t('introCuriosity') }}</p>
      </div>
      <div class="role-selection">
        <pv-button :label="$t('owner')" @click="selectRole('owner')" />
        <pv-button :label="$t('tenant')" @click="selectRole('tenant')" />
      </div>
    </div>

    <div v-if="showSteps === 'tenant'" class="steps">
      <h3>{{ $t('tenantStepsTitle') }}</h3>
      <ol>
        <li>{{ $t('tenantStep1') }}</li>
        <li>{{ $t('tenantStep2') }}</li>
        <li>{{ $t('tenantStep3') }}</li>
        <li>{{ $t('tenantStep4') }}</li>
        <li>{{ $t('tenantStep5') }}</li>
        <li>{{ $t('tenantStep6') }}</li>
      </ol>
    </div>

    <div v-if="showSteps === 'owner'" class="steps">
      <h3>{{ $t('ownerStepsTitle') }}</h3>
      <ol>
        <li>{{ $t('ownerStep1') }}</li>
        <li>{{ $t('ownerStep2') }}</li>
        <li>{{ $t('ownerStep3') }}</li>
        <li>{{ $t('ownerStep4') }}</li>
        <li>{{ $t('ownerStep5') }}</li>
      </ol>
    </div>

    <div class="surprise">
      <div>
        <pv-button :label="$t('surprise')" @click="selectRole('surprise')" class="surprise-button" />
      </div>
      <div v-if="showSteps === 'surprise'" class="surprise-section">
        <div class="surprise-image">
          <img src="https://cdn-icons-png.flaticon.com/512/7457/7457314.png" alt="Surprise Icon" />
        </div>
        <div>
          <p class="final-note">{{ $t('dualRoleMessage') }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js'

const tenantApiServices = new TenantApiServices();
const userDetails = ref(null);
const showSteps = ref(null);

// Función para seleccionar el rol y mostrar la sección de pasos
function selectRole(role) {
  showSteps.value = role;
}

onBeforeMount(async () => {
  const loggedInUserId = localStorage.getItem('userId');

  if (loggedInUserId) {
    try {
      const dataUser = await tenantApiServices.getUserById(loggedInUserId);
      userDetails.value = dataUser.data;

    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  } else {
    console.error('No user ID found in localStorage');
  }
});


</script>


<style scoped>
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
}
.imgWelcome {
  margin-right: 10px;
}
.welcome-icon {
  width: 180px;
  height: auto;
  border-radius: 30px;
}
h2{
  font-size: 50px;
  color: #9a3006;
}

.intro-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  margin: 20px;
}
.paragraph {
  margin-bottom: 20px;
  font-size: 1.2em;
  text-align: center;
  color: #333;
}
.role-selection {
  display: flex;
  gap: 20px;
}


.surprise{
  padding: 20px;
}
.surprise-button {
  padding: 10px 20px; /* Espaciado dentro del botón */
  background-color: #ffcc00; /* Color de fondo del botón */
  color: #fff; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  font-size: 1em; /* Tamaño de fuente del botón */
  transition: background-color 0.3s, transform 0.3s; /* Transición suave */
}
.surprise-button:hover {
  background-color: #e0b800; /* Color de fondo al pasar el cursor */
  transform: scale(1.05); /* Efecto de aumento al pasar el cursor */
}
.surprise-section {
  display: flex; /* Utiliza flexbox para alinear la imagen y el texto */
  align-items: center; /* Centra verticalmente los elementos */
  margin-top: 20px; /* Espacio superior */
  padding: 10px; /* Espaciado interior */
  background-color: #f0f0f0; /* Color de fondo suave */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Sombra para dar profundidad */
}
.surprise-image {
  margin-right: 20px; /* Espacio entre la imagen y el texto */
}
.surprise-image img {
  width: 50px; /* Ancho de la imagen */
  height: 50px; /* Alto de la imagen */
}
.final-note {
  font-size: 1.1em; /* Tamaño de fuente más grande */
  color: #333; /* Color del texto */
  text-align: left; /* Alineación del texto */
}


.steps{
  padding: 0 60px;
}

</style>