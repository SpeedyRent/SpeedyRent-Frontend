export class TenantEntity {
  constructor(
    id = '',
    tenant_id = '',
    requests = []
  ) {
    this.id = id !== null ? id : '';
    this.tenant_id = tenant_id;
    this.requests = requests.length ? requests : [];
  }
}