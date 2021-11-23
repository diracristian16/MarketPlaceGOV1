import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { PaymentsService } from 'src/app/service/payments.service';
//import { ToastrService } from 'ngx-toastr';
import swal from'sweetalert2';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  form: FormGroup;
  public products : any = [];
  public grandTotal !: number;
  currentDate: any;
  constructor(private cartService : CartService,
             private formBuilder: FormBuilder,
             private paymentsService : PaymentsService,
             private router: Router
            /* private toastr: ToastrService*/) {
    this.form = this.formBuilder.group({
      numero:['',Validators.required],
      tipo:['',Validators.required],
      vencimiento: ['',Validators.required],
      codcvc:['',Validators.required]
      /*customerId: ['',Validators.required],
      detailOrder:[{
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
    console.log(this.grandTotal)
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  onSubmit(){
    let creditCardNumber = this.form.controls.numero.value
    let creditCardFranchise = this.form.controls.tipo.value
    let creditCardCVC = this.form.controls.codcvc.value
    let orderNumber = Number(localStorage.getItem('paymentId'))
    let datePayment = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(datePayment+'esta es la fecha')
   // let idCliente = this.form.controls.idClient.value
    //console.log(OrderProduct)
 let OrderPago={

  "paymentId": orderNumber,
  "paymentDate": datePayment,
  "paymentMethod": "CreditCard",
  "creditCardNumber": creditCardNumber,
  "creditCardFranchise": creditCardFranchise,
  "creditCardCVC": creditCardCVC,
  "idOrder": orderNumber,
  "totalAmount": this.grandTotal,
  "numberDues": null,
  "estadoPago": "PAYMENT_PENDNIG",
  "stockStatus": null,
  "numberPaymentReference": null

}
console.log(OrderPago)
    this.paymentsService.guardarPayment(OrderPago).subscribe(data=>{
      // console.log(order+"ddddd");
      // this.toastr.success('Pago Pendiente por confirmar','Verificar');
       //this.customerService.obtenerCustomers();
       //this.form.reset();
       this.emptycart()
    swal.fire({
      icon: "warning",
      title: "Confirmación...",
      text: "Pago pendiente por confirmar",
      background: "#1e2122",
      confirmButtonColor: "#ff6600",
      confirmButtonText: "OK",
      iconColor: "#ff6600",
    });
     this.router.navigate(['/products'])
     })

  }
}
