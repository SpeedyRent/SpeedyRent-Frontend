export class RequestEntity {
  constructor(
    id = '',
    car_id = '',
    photo_Car= '',
    from = '',
    to = '',
    total_days = 0,
    pick_up_time = '',
    return_time = '',
    total_mount = 0,
    status = '',
    contract = ''
  ) {
    this.id = id !== null ? id : '';
    this.car_id = car_id;
    this.photo_Car = photo_Car;
    this.from = from;
    this.to = to;
    this.total_days = total_days;
    this.pick_up_time = pick_up_time;
    this.return_time = return_time;
    this.total_mount = total_mount;
    this.status = status;
    this.contract = contract;
  }
}