<template>
  <div class="Conteiner">
    <div class="login-box">
      <div class="logo">
        <img src="https://i.postimg.cc/50wNP4RM/image.png" alt="Logo">
        <h2>Welcome to SpeedyRent</h2>
      </div>
      <form class="login-form" >
        <label for="email">Email Address</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" required>

        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" required>

        <div class="form-links">
          <router-link to="" class="link">Forgot your password?</router-link>
          <router-link to="/register" class="link">Create new account</router-link>
        </div>
        <pv-button type="submit" class="login-button" @click="handleLogin">Login</pv-button>
      </form>
      <p v-if="visible" class="error-message">{{ errorMessage }}</p>
    </div>
    <div class="ImagenAuto">
      <img src="https://i.postimg.cc/QdQGYmFp/image.png" alt="Imagen" class="login-image">
    </div>
  </div>
</template>

<script setup>
import { ref , onMounted } from 'vue';
import { TenantApiServices } from '@/contexts/rentals/services/tenant-api.services.js'
import { useRouter } from 'vue-router';

const users = ref([]);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const visible = ref(false);
const tenantApiServices = new TenantApiServices();
const router = useRouter();

// Cargar usuarios desde el JSON
onMounted ( async () => {
  try {
    const usersData = await tenantApiServices.getAllUsers();
    users.value = usersData.data;

  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const handleLogin = async () => {
  try {
    // Verificar si ya hemos cargado los usuarios
    if (users.value.length === 0) {
      throw new Error('No users loaded. Please try again later.');
    }

    // Buscar el usuario que coincida con el email y la contraseña
    const user = users.value.find(u => u.email === email.value && u.password === password.value);

    if (!user) {
      // Si el usuario no existe o la contraseña es incorrecta
      throw new Error('Invalid email or password');
    }

    // Login exitoso
    console.log('Login successful', user);
    console.log('userId', user.id);
    localStorage.setItem('userId', user.id);

    // Redirigir solo si el login es exitoso
    router.push('/home');
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      errorMessage.value = 'Invalid email or password. Please try again.';
    } else {
      errorMessage.value = 'An error occurred while trying to log in.';
    }
    visible.value = true; // Mostrar el mensaje de error
  }
};

</script>


<style scoped>

.Conteiner {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh;
  width: 100vw;
  padding: 10px; /* Evita que el contenido se pegue a los bordes */
  position: absolute;
  top:0;
  left: 0;
}

.login-box {
  align-items: center; /* Centra la imagen verticalmente */
  justify-content: center; /* Centra verticalmente los elementos */
  max-width: 400px;
  min-height: 300px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 auto; /* Centra horizontalmente */
  display: flex;
  flex-direction: column; /* Alinea el contenido internamente */
}

.logo {
  text-align: center;
  margin-bottom: 2rem;
}

.ImagenAuto {
  display: flex;
  justify-content: center; /* Centra la imagen horizontalmente */
  align-items: center; /* Centra la imagen verticalmente */
  width: 100%; /* El ancho se ajustará al 100% del contenedor padre */
  height: 100%; /* La altura fija que deseas para el contenedor */
}

.login-image {
  width: 100%; /* La imagen ocupará el 100% del ancho del contenedor */
  height: 100%; /* La imagen ocupará el 100% de la altura del contenedor */
  object-fit: cover; /* Ajustará la imagen al contenedor sin deformarla */
}

.logo img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  margin-top: 10px;
}

.login-form input {
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-links {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.form-links .link:hover {
  background-color: transparent; /* Evita cualquier cambio de fondo */
}

.login-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
/* Estilos responsive */
@media (max-width: 768px) {
  .Conteiner {
    flex-direction: column; /* Cambia la dirección a vertical */
  }

  .login-image {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
  }

  .login-box {
    width: 100%;
    max-width: 90%;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .login-box {
    padding: 10px;
  }

  .login-button {
    padding: 8px;
  }
}


</style>