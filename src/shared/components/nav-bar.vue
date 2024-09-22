<template>
  <nav class="navbar">
    <div class="logo-container">
      <img src="https://i.postimg.cc/50wNP4RM/image.png" alt="Logo" class="logo">
    </div>
    <div class="nav-links">
      <button class="nav-button" @click="navigateTo('offers')">Offerts</button>
      <button class="nav-button" @click="navigateTo('about')">About Us</button>
      <button class="nav-button" @click="navigateTo('community')">Community</button>
      <button class="nav-button" @click="navigateTo('resources')">Resources</button>
      <button class="nav-button" @click="navigateTo('work')">Work With Us</button>
      <button class="nav-button" @click="navigateTo('leasing')">Leasing Information</button>

      <div class="user-menu">
        <img src="https://i.postimg.cc/Yq0sGgKp/user-icon.png" alt="User" @click="toggleDropdown" class="user-icon">
        <div v-if="showDropdown" class="dropdown-menu">
          <button @click="navigateTo('profile')">Profile</button>
          <button @click="navigateTo('settings')">Settings</button>
          <button @click="handleLogout">Logout</button>
        </div>
      </div>
    </div>
    <button class="menu-toggle" @click="toggleMenu">☰</button>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const showDropdown = ref(false);
const showMenu = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const navigateTo = (route) => {
  console.log(`Navigating to ${route}`);
};

const handleLogout = () => {
  console.log('Logging out');
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2C3E50;
  padding: 1rem 2rem;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-button {
  background: none;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 30px;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
}

.user-menu {
  position: relative;
}

.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.dropdown-menu button {
  background: none;
  border: none;
  color: #2C3E50;
  padding: 0.75rem 1.5rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Responsive Styles */
.menu-toggle {
  display: none;
  font-size: 1.5rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #2C3E50;
  }

  .nav-links.active {
    display: flex;
  }

  .menu-toggle {
    display: block;
  }
}
</style>
