import axios from "axios";

export class TenantApiServices {
  async getAllTenants() {
    return await axios.get('http://localhost:3000/tenant');
  }
}