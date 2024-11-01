import axios from "axios";

const API_URL = 'http://localhost:3000/';

export class TenantApiServices {
  // Obtener todos los usuarios
  async getAllUsers() {
    return await axios.get(`${API_URL}User`);
  }
  async updateUser(userId, userData) {
    return await axios.put(`${API_URL}User/${userId}`, userData);
  }
  async getUserById(userId) {
    return await axios.get(`${API_URL}User/${userId}`);
  }
  // Obtener todos los inquilinos
  async getAllTenants() {
    return await axios.get(`${API_URL}tenants`);
  }
  async createOwner(ownerData) {
    return await axios.post(`${API_URL}owners`, ownerData);
  }
  async createTenant(tenantData) {
    return await axios.post(`${API_URL}tenants`, tenantData);
  }
  // Actualizar al inquilino con el nuevo request
  async updateTenantRequest(tenantId, requestData) {
    return await axios.put(`${API_URL}tenants/${tenantId}`, requestData);
  }
  async updateTenantDates(requestId, updatedData) {
    return await axios.patch(`${API_URL}requests/${requestId}`, updatedData);
  }
  // Obtener todos los request
  async getAllRequests() {
    return await axios.get(`${API_URL}requests`);
  }
  async getRequestById(requestId) {
    return await axios.get(`${API_URL}requests/${requestId}`);
  }
  async createRequest(requestData) {
    return await axios.post(`${API_URL}requests`, requestData);
  }
  // Obtener todos los propietarios
  async getAllOwners() {
    return await axios.get(`${API_URL}owners`);
  }
  // Actualizar el propietario con el nuevo vehículo
  async updateOwnerVehicles(ownerId, vehicleData) {
    return await axios.put(`${API_URL}owners/${ownerId}`, vehicleData);
  }
  // Obtener todos los vehículos
  async getAllVehicles() {
    return await axios.get(`${API_URL}vehicles`);
  }
  async getVehicleById(vehicleId) {
    return await axios.get(`${API_URL}vehicles/${vehicleId}`);
  }
  // Eliminar un vehículo específico de un propietario
  async deleteVehicle(vehicleId) {
    return await axios.delete(`${API_URL}vehicles/${vehicleId}`);
  }
  async updateVehicleById(vehicleId, vehicleData) {
    return await axios.put(`${API_URL}vehicles/${vehicleId}`, vehicleData);
  }
  async createVehicle(vehicleData) {
    return await axios.post(`${API_URL}vehicles`, vehicleData);
  }
  // Registrar un nuevo usuario
  async registerUser(user) {
    return await axios.post(`${API_URL}User`, user);
  }
}
