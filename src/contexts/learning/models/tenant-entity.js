export class Tenant {
  constructor(
    id = 0,
    name = '',
    phone = '',
    email = '',
    image_tenant = '',
    dni = ''
  ) {
    this.id = id !== null ? id : 0
    this.name = name
    this.phone = phone
    this.email = email
    this.image_tenant = image_tenant
    this.dni = dni
  }
}