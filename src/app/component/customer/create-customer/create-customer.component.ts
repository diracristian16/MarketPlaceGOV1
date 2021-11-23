import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription: Subscription | any;
  customer: Customer | any;
  numDocCliente: 0 | any;
  tipoDocCliente: 0 | any;
  id: 0 | any;
  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService) {
      this.form = this.formBuilder.group({
       /* id: 0,*/
        numeroDocumento:['',[Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
        tipoDocumento:['',[Validators.required]],
        nombres:['',[Validators.required]],
        apellidos:['',[Validators.required]],
        direccion:['',[Validators.required]],
        telefono:['',[Validators.required]],
        email:['',[Validators.required, Validators.email]],
      })
     }

  ngOnInit(): void {
    this.suscription = this.customerService.obtenerCustomer$().subscribe(data=>{
      console.log(data);
      this.customer = data;
      this.form.patchValue({
        numeroDocumento: this.customer.numeroDocumento,
        tipoDocumento: this.customer.tipoDocumento,
        nombres: this.customer.nombres,
        apellidos: this.customer.apellidos,
        direccion: this.customer.direccion,
        telefono: this.customer.telefono,
        email: this.customer.email
      });
      this.id = this.customer.id;
    });
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  guardarCustomer(){
    this.agregar();
  }
  editarCustomer(){
    this.editar();
  }
  agregar(){
    const customer: Customer={
      numeroDocumento: this.form.get('numeroDocumento')?.value,
      tipoDocumento: this.form.get('tipoDocumento')?.value,
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      direccion: this.form.get('direccion')?.value,
      telefono: this.form.get('telefono')?.value,
      email: this.form.get('email')?.value,
    }
    this.customerService.guardarCustomer(customer).subscribe(data=>{
      //this.toastr.success('Registro Agregado','El cliente fue agregado');
      this.customerService.obtenerCustomers();
      this.form.reset();
    })
  }

  editar(){
    const customer: Customer={
      numeroDocumento: this.form.get('numeroDocumento')?.value,
      tipoDocumento: this.form.get('tipoDocumento')?.value,
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      direccion: this.form.get('direccion')?.value,
      telefono: this.form.get('telefono')?.value,
      email: this.form.get('email')?.value,
    }
    this.customerService.actualizarCustomer( this.form.get('numeroDocumento')?.value, this.form.get('tipoDocumento')?.value, customer).subscribe(data=>{
      //this.toastr.success('Registro Editado','El cliente fue actualizado');
      this.customerService.obtenerCustomers();
      this.form.reset();
      this.id = 0;
    })
  }

}
