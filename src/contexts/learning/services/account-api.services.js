import axios from "axios";

const API_URL = 'https://api.jsonbin.io/v3/b/67203fedacd3cb34a89eb433';

export class AccountApiServices {

    async getUserProfile(userId) {
        try {
            const response = await axios.get(`${API_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener el perfil del usuario: ' + (error.response?.data?.error || error.message));
        }
    }


    async updateUserProfile(userId, updatedData) {
        try {
            const response = await axios.put(`${API_URL}/users/${userId}`, updatedData);
            return response.data;
        } catch (error) {
            throw new Error('Error al actualizar el perfil del usuario: ' + (error.response?.data?.error || error.message));
        }
    }
}
