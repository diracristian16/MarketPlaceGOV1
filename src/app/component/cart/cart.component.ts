import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  form: FormGroup;
  order: Order | any;
  public products : any = [];
  public grandTotal !: number;

  baseEndPoint =  'http://10.43.100.180:3740/products';
  constructor(private cartService : CartService,private formBuilder: FormBuilder,
    private orderService: OrderService, private router: Router) {
      this.form = this.formBuilder.group({
         idClient:['',Validators.required]
         /*detailOrder:[{
          productId:['',Validators.required],
          price:['',Validators.required],
          quantity:['',Validators.required]
         }]*/

       })
     }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  paycart(item: any){
    console.log(item);
  }

  onSubmit(){
    //console.log(this.products);
    //console.log(this.form.controls.idClient.value);
    let idCliente = this.form.controls.idClient.value
    let OrderProduct: any[] = []

    this.products.forEach((element: any) => {
      //console.log(element)
      let array={"quantity": element.quantity,
      "price":  element.precio,
      "productId":element.id}

      OrderProduct.push(array)
    });
    //console.log(OrderProduct)
 let OrderFinal={

  "idClient":idCliente,

  "totalPago": this.grandTotal,

  "customerId": idCliente,

  "orderDetails": OrderProduct

}
//console.log(OrderFinal)
    this.orderService.guardarOrder(OrderFinal).subscribe(data=>{
      // console.log(order+"ddddd");
       //this.toastr.success('Registro Agregado','El cliente fue agregado');
       //this.customerService.obtenerCustomers();
       //this.form.reset();
       let NumberOrder = String(data.id);
       localStorage.setItem('paymentId',NumberOrder);
       //console.log(data.id);
       this.router.navigate(['/payments'])
       swal.fire({
        icon: "success",
        title: "Exitoso...",
        text: "Orden Número "+NumberOrder+ " creada con exito",
        background: "#1e2122",
        confirmButtonColor: "#ff6600",
        confirmButtonText: "OK",
        iconColor: "#ff6600",
      });
     })
  }




}

