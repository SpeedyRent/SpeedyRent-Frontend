<template>
  <div class="register-renter-container">
    <div class="register-left-side">
      <!-- Título para pantallas grandes -->
      <h1 class="title">SpeedyRent</h1>

      <!-- Logo para pantallas pequeñas -->
      <img class="logo-small" src="/public/logo_speedy.jpeg" alt="Speedy Rent Logo" />

      <div class="register-card">
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" placeholder="E-mail" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" placeholder="Password" required />
          </div>

          <!-- Campo adicional para Confirmar Contraseña -->
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
          </div>

          <!-- Campo adicional para Número de teléfono con código predeterminado +51 -->
          <div class="form-group phone-group">
            <label for="phoneNumber">Phone Number</label>
            <div class="phone-inputs">
              <input type="text" value="+51" disabled class="country-code" />
              <input type="tel" v-model="phoneNumber" placeholder="Your phone number" class="phone-number" required />
            </div>
          </div>

          <div class="form-group checkbox-group">
            <input type="checkbox" v-model="receiveEmails" />
            <label for="receiveEmails" class="checkbox-label">
              I want to receive emails
              <span class="small-text">Opt-out anytime</span>
            </label>
          </div>

          <button type="submit" class="register-btn">Register</button>
        </form>
      </div>
    </div>
    <div class="image-side">
      <img src="../assets/carimage.png" alt="Car Image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '', // Campo de confirmación de contraseña
      phoneNumber: '', // Campo para número de teléfono
      receiveEmails: false
    };
  },
  methods: {
    registerUser() {
      const userData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        phoneNumber: this.phoneNumber,
        receiveEmails: this.receiveEmails
      };
      console.log('User data:', userData);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@600&display=swap'); /* Fuente Roboto Semibold */

.register-renter-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: flex-start;
  padding-left: 5vw;
  box-sizing: border-box;
}

.register-left-side {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.image-side {
  width: 50%;
  height: 100%;
}

.image-side img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Asegura que la imagen cubra todo el contenedor sin deformarse */
  object-position: 100% center; /* Posición predeterminada al centro de la imagen */
}

.title {
  font-size: 120px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  margin-bottom: 30px;
  color: #2c3e50;
}

.logo-small {
  display: none;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 30px;
}

.register-card {
  width: 400px;
  background-color: white;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #ccc; /* Borde delgado */
}

h1, label, input, button {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 10px;
}

.checkbox-label {
  font-size: 14px;
  margin-left: 1px; /* Ajusta el espacio entre el checkbox y el texto */
}

.phone-inputs {
  display: flex;
  align-items: center;
}

.country-code {
  width: 60px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
  background-color: #f2f2f2;
}

.phone-number {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 5px 5px 0;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.small-text {
  font-size: 12px;
  color: #888;
}

/* Media query para pantallas más pequeñas */
@media (max-width: 768px) {
  .register-renter-container {
    flex-direction: column;
    justify-content: center;
    padding: 0 5vw;
  }

  .register-left-side {
    width: 100%;
    align-items: center;
  }

  .register-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
  }

  .image-side {
    display: none;
  }

  .title {
    display: none;
  }

  .logo-small {
    display: block;
  }
}
</style>
