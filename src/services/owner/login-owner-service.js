import axios from 'axios';

const API_URL = 'https://reqres.in/api/register';

export default  {
  async login(user) {
    try {
      const response = await axios.post(API_URL, {
        email: user.email,
        password: user.password
      });
      return response.data;
    } catch (error) {
      throw new Error('Error en el inicio de sesión: ' + error.response.data.error);
    }
  }
};
