export class Tenant {
  constructor(
    id = 0,
    name = '',
    phone = '',
    email = '',
    image_tenant = '',
    dni = '',
    price='',
    total_days='',
    from = '',
    to = '',
    total_mount = 0,
    img_Car='',
    pick_up_time='',
    return_time='',
    status=''
  ) {
    this.id = id !== null ? id : 0
    this.name = name
    this.phone = phone
    this.email = email
    this.image_tenant = image_tenant
    this.dni = dni
    this.price = price
    this.total_days = total_days
    this.from = from
    this.to = to
    this.total_mount = total_mount
    this.img_Car = img_Car
    this.pick_up_time = pick_up_time
    this.return_time = return_time
    this.status = status
  }
}