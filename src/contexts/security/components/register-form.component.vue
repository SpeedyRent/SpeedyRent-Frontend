<template>
  <div class="register-container">
    <div class="right-half">
      <img src="https://i.postimg.cc/3RCYXLk8/image.png" alt="Imagen" class="register-image">
    </div>
    <div class="left-half">
      <div class="register-box">
        <div class="logo">
          <h2>Regístrate en SpeedyRent</h2>
        </div>
        <form @submit.prevent="handleRegister" class="register-form">
          <label for="text">Nombres y Apellidos</label>
          <input type="text" id="text" v-model="names" placeholder="Ingresa tus nombres y apellidos" required>

          <label for="email">Correo electrónico</label>
          <input type="email" id="email" v-model="email" placeholder="Ingresa tu correo" required>

          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña" required>

          <label for="confirm-password">Confirmar Contraseña</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirma tu contraseña" required>

          <label for="personal-doc">Documento Personal (DNI) </label>
          <input type="file" id="personal-doc" required>

          <Button type="submit" class="register-button" as="router-link" to="/login" >Registrarse</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';

const names = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = async () => {

};
</script>

<style scoped>
.register-container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.right-half {
  flex: 1;
}

.register-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.left-half {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 2rem;
}

.register-box {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.logo {
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.8rem;
  color: #333;
}

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

input[type="email"],
input[type="password"],
input[type="text"],
input[type="file"] {
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
  border-color: #007bff;
}

.register-button {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #0056b3;
}

.remove-button {
  background-color: #f44336;
  color: white;
  margin-top: 0.5rem;
}

.remove-button:hover {
  background-color: #d32f2f;
}

@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
  }

  .right-half {
    display: none;
  }

  .left-half {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .left-half {
    padding: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .register-form {
    max-width: 100%;
  }
}
</style>