<template>
  <div class="login-container">
    <div class="left-half">
      <div class="login-box">
        <div class="logo">
          <img src="https://i.postimg.cc/50wNP4RM/image.png" alt="Logo">
          <h2>Bienvenido a SpeedyRent</h2>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">

          <label for="email">Correo electrónico</label>
          <input type="email" id="email" v-model="email" placeholder="Ingresa tu correo" required>

          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña" required>

          <div class="form-links">
            <router-link to="" class="link">¿Olvidaste tu contraseña?</router-link>
            <router-link to="/singup" class="link">Crear cuenta nueva</router-link>
          </div>

          <button type="submit" class="login-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
    <div class="right-half">
      <img src="https://i.postimg.cc/3RCYXLk8/image.png" alt="Imagen" class="login-image">
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import User from '@/models/user.js';
import UserService from '@/services/owner/login-owner-service.js';

const email = ref('');

const password = ref('');
const errorMessage = ref('');
const visible = ref(false);
const router = useRouter();

const handleLogin = async () => {
  const user = new User(email.value, password.value);

  try {
    const data = await UserService.login(user);
    console.log('Login exitoso', data);
    await router.push('/home-owner');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
    } else {
      errorMessage.value = 'Ocurrió un error al intentar iniciar sesión.';
    }
    visible.value = true;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.left-half {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 2rem;
}

.login-box {
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

.logo img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.8rem;
  color: #333;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

input {
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
}

.form-links {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.link {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.link:hover {
  text-decoration: underline;
}

.login-button {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.right-half {
  flex: 1;
}

.login-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .left-half, .right-half {
    width: 100%;
    height: auto;
  }

  .right-half {
    display: none;
  }

  .left-half {
    box-shadow: none;
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

  .login-form {
    max-width: 100%;
  }

  .input {
    font-size: 0.9rem;
  }
}
</style>
