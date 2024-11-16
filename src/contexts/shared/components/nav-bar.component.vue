<template>
  <div class="card">
    <pv-menubar :model="items" class="navbar">
      <template #start>
        <div class="logo-container" >
          <img src="https://i.postimg.cc/50wNP4RM/image.png" alt="Logo" class="logo">
        </div>
      </template>
      <template #item="{ item, props }">
        <router-link v-ripple class="items" v-bind="props.action" :to="item.to">
          <span :class="item.icon" style="color: white"/>
          <span class="nav-button">{{t(item.label) }}</span>
        </router-link>
      </template>
      <template #end>
        <div class="end-container">
          <div class="language-switcher">
            <pv-button @click="toggleLanguage" :label="languageLabel" text plain />
          </div>
          <div class="user-menu">
            <img :src="userDetails?.photo_user" alt="User" @click="toggleDropdown" class="user-icon" />
            <div v-if="showDropdown" class="dropdown-menu">
              <pv-button class="button" as="router-link" to="/Profile" :label="$t('profile')" />
              <pv-button class="button" as="router-link" to="/" :label="$t('logout')" />
            </div>
          </div>
        </div>
      </template>
    </pv-menubar>
  </div>
</template>

<script setup>
import { onBeforeMount, ref , computed} from 'vue'
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js'

const tenantApiServices = new TenantApiServices();
const userDetails = ref(null);


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

import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const items = ref([
  {
    label: 'home',
    icon: 'pi pi-home',
    to: '/home',
  },
  {
    label: 'myVehicles',
    icon: 'pi pi-car',
    to: '/ListVehicles',
  },
  {
    label: 'searchVehicles',
    icon: 'pi pi-search',
    to: '/searchVehicles',
  },
  {
    label: 'request',
    icon: 'pi pi-clipboard',
    to:'/requestTable',
  },
  {
    label: 'myNotifications',
    icon: 'pi pi-bell',
    to: '/myNotifications',
  }
]);

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const languageLabel = computed(() => (locale.value === 'en' ? 'EN' : 'ES'));

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'es' : 'en'; // Alternar entre inglés y español
}

</script>


<style scoped>

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2C3E50;
  padding: 1rem 2rem;
}

.navbar a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: none;
  color: white;
  transition: background 0.3s, box-shadow 0.3s;
  border-radius: 5px;
  background-color: #2C3E50;
}

.navbar a:hover {
  box-shadow: 0 0 100px rgba(77, 92, 107, 0.8);
  background: rgba(77, 92, 107, 0.8);
  outline: none;
}

.navbar a:focus {
  box-shadow: none;
  outline: none;
}

.end-container {
  display: flex;
  align-items: center; /* Centra verticalmente los elementos */
}

.language-switcher {
  background-color: white;
  border-radius: 10px;
  margin-right: 10px; /* Espacio entre el botón de idioma y el menú de usuario */
}

.user-icon {
  cursor: pointer; /* Cambia el cursor al pasar sobre el icono */
}
.user-menu {
  color: white;
  align-items: center;
  position: relative;
  justify-content: space-between;
  top: 4px;
}
.user-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.button {
  outline: none;
  border: none;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 5px;
  position: absolute;
  top: 60px;
  right: 0;
  width: 120px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

</style>
