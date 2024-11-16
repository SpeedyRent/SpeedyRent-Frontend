export class OwnerEntity {
  constructor(
    id = '',
    owner_id = '',
    vehicles = []
  ) {
    this.id = id !== null ? id : '';
    this.owner_id = owner_id;
    this.vehicles = vehicles.length ? vehicles : [];
  }
}
