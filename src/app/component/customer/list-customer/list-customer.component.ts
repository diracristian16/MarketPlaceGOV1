import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  constructor(public customerService: CustomerService
    /*,
    public toastr: ToastrService*/) { }

  ngOnInit(): void {
    this.customerService.obtenerCustomers();
  }

  eliminarCustomer(numDocumento?:string | any, tipoDocumento?:string | any){
    if(confirm('Esta seguro que desea eliminar el registro?')){
        this.customerService.eliminarCustomer(numDocumento,tipoDocumento).subscribe(data =>{
          //this.toastr.warning('Registro Eliminado', 'El cliente fue eliminado');
          this.customerService.obtenerCustomers();
      })
    }
  }

  editar(numDocumento?:string | any, tipoDocumento?:string | any, customer?: any){
    this.customerService.actualizar(numDocumento, tipoDocumento, customer);

  }


}
