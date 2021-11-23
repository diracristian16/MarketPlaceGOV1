export class Order{
  id?: number;
  idClient?: number;
  fechaOrden?: Date;
  totalPago?:number;
  customerId?: number;
  orderStatus?:string;
  detailOrder?:[{
    productId:number,
    price:number,
    quantity:number,
   }]
}
