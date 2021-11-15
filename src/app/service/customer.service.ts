import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  myApiUrl = 'api/Customer';
  list!: Customer[];
  private actualizarFormulario = new BehaviorSubject<Customer>({} as any);

  constructor(private http: HttpClient) { }

  guardarCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.myApiUrl, customer);
  }

  eliminarCustomer(numeroDocumento: string, tipoDocumento: string):Observable<Customer>{
    return this.http.delete<Customer>(this.myApiUrl+"/"+numeroDocumento+"/"+tipoDocumento);

  }
  obtenerCustomers(){
     this.http.get(this.myApiUrl).toPromise()
      .then(data =>{
        this.list = data as Customer[];
      });
  }
  actualizarCustomer(numeroDocumento: string, tipoDocumento: string, customer: Customer):Observable<Customer>{

    return this.http.put<Customer>(this.myApiUrl+"/"+numeroDocumento+"/"+tipoDocumento, customer);

  }


  actualizar(numeroDocumento: string, tipoDocumento: string,customer: any){
    this.actualizarFormulario.next(customer);
  }

  obtenerCustomer$(): Observable<Customer>{
    return this.actualizarFormulario.asObservable();
  }

}
