export class UserEntity {
  constructor(
    id = '',
    name = '',
    phone = '',
    photo_user = '',
    email = '',
    password = '',
    dni = '',
    dni_image = '',
    driver_license = ''
  ) {
    this.id = id !== null ? id : '';
    this.dni = dni;
    this.dni_image = dni_image;
    this.name = name;
    this.phone = phone;
    this.photo_user = photo_user;
    this.email = email;
    this.password = password;
    this.driver_license = driver_license
  }
}
