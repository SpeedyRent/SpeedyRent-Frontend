export class UserEntity {
  constructor(
    id = '',
    dni = '',
    name = '',
    phone = '',
    email = '',
    password='',
    image_tenant = '',
    status = '',
    from = '',
    to = '',
    total_days = 0,
    pick_up_time = '',
    return_time = '',
    price = 0,
    total_mount = 0,
    img_car = '',
    vehicles = []
  ) {
    this.id = id !== null ? id : '';
    this.dni = dni;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.image_tenant = image_tenant;
    this.status = status;
    this.from = from;
    this.to = to;
    this.total_days = total_days;
    this.pick_up_time = pick_up_time;
    this.return_time = return_time;
    this.price = price;
    this.total_mount = total_mount;
    this.img_car = img_car;
    this.vehicles = vehicles.map(vehicleData => ({
      id: vehicleData.id || 0,
      brand: vehicleData.brand || '',
      model: vehicleData.model || '',
      year: vehicleData.year || 0,
      rate: vehicleData.rate || 0,
      description: vehicleData.description || '',
      images: vehicleData.images || []
    }));
  }

  static fromLoginData(email, password) {
    return new UserEntity('', '', '', '', email, password);
  }

}