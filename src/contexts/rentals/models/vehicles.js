export class VehiclesEntity {
  constructor(
    id = '',
    contract ='',
    brand = '',
    model = '',
    photos=[],
    year = 0,
    rate = 0,
    description = '',
    location = '',
  ) {
    this.id = id !== null ? id : '';
    this.contract = contract;
    this.brand = brand;
    this.model = model;
    this.photos = photos;
    this.year = year;
    this.rate = rate;
    this.description = description;
    this.location = location;
  }
}