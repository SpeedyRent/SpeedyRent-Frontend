import axios from "axios";

const API_URL = 'https://reqres.in/api/register';

export class TenantApiServices {
  async getAllTenants() {
    return await axios.get('http://localhost:3000/tenant');
  }
  async updateTenantDates(tenantId, updatedData) {
    return await axios.patch(`http://localhost:3000/tenant/${tenantId}`, updatedData);
  }


  async getTenantById(tenantId) {
    return await axios.get(`http://localhost:3000/tenant/${tenantId}`);
  }

  async getVehiclesByTenantId(tenantId) {
    const tenant = await this.getTenantById(tenantId);
    return tenant.data.vehicles || [];
  }

  async addVehicleToTenant(tenantId, vehicle) {
    const tenantResponse = await this.getTenantById(tenantId);
    const tenant = tenantResponse.data;
    const vehicles = tenant.vehicles || [];

    vehicle.id = Date.now(); // Generar un ID único para el vehículo
    vehicles.push(vehicle);

    return await axios.put(`http://localhost:3000/tenant/${tenantId}`, { ...tenant, vehicles });
  }

  async updateVehicleInTenant(tenantId, vehicleId, updatedVehicle) {
    const tenantResponse = await this.getTenantById(tenantId);
    const tenant = tenantResponse.data;
    const vehicles = tenant.vehicles.map((v) => (v.id === vehicleId ? updatedVehicle : v));

    return await axios.put(`http://localhost:3000/tenant/${tenantId}`, { ...tenant, vehicles });
  }

  async deleteVehicleFromTenant(tenantId, vehicleId) {
    const tenantResponse = await this.getTenantById(tenantId);
    const tenant = tenantResponse.data;
    const vehicles = tenant.vehicles.filter((v) => v.id !== vehicleId);

    return await axios.put(`http://localhost:3000/tenant/${tenantId}`, { ...tenant, vehicles });
  }

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
}