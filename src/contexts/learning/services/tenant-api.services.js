import axios from "axios";

export class TenantApiServices {
  async getAllTenants() {
    return await axios.get('http://localhost:3000/tenant');
  }
  async updateTenantDates(tenantId, updatedData) {
    return await axios.patch(`http://localhost:3000/tenant/${tenantId}`, updatedData);
  }
}