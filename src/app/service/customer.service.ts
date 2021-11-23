import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  myApiUrl = 'api/Customer/api/Customer';
  list!: Customer[];
  private actualizarFormulario = new BehaviorSubject<Customer>({} as any);

  constructor(private http : HttpClient, private authService: AuthService) { }

  authToken(){
    //console.log(localStorage.getItem('tokenid')+"ojo este es el token");
    const valAuth = localStorage.getItem('tokenid');
    //console.log(valAuth+"ojo este es el token seteado");
    this.authService.login().subscribe(result=>{
      if(valAuth == null){
        //console.log('estoy en el if adentro');
        window.location.reload();
      }
    })
  }
 protected headers= new HttpHeaders({
    'Authorization': 'Bearer '+localStorage.getItem('tokenid')
  });

  obtenerCustomers(){
    console.log('aca ingreso al obtener customersss');
     this.http.get(this.myApiUrl).toPromise()
      .then(data =>{
        //console.log(data+'ohohohohoho');
        this.list = data as Customer[];
      });
    }


  guardarCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.myApiUrl, customer, {headers: this.headers});
  }

  eliminarCustomer(numeroDocumento: string, tipoDocumento: string):Observable<Customer>{
    return this.http.delete<Customer>(this.myApiUrl+"/"+numeroDocumento+"/"+tipoDocumento, {headers: this.headers});

  }
  actualizarCustomer(numeroDocumento: string, tipoDocumento: string, customer: Customer):Observable<Customer>{

    return this.http.put<Customer>(this.myApiUrl+"/"+numeroDocumento+"/"+tipoDocumento, customer, {headers: this.headers});

  }


  actualizar(numeroDocumento: string, tipoDocumento: string,customer: any){
    this.actualizarFormulario.next(customer);
  }

  obtenerCustomer$(): Observable<Customer>{
    return this.actualizarFormulario.asObservable();
  }

}
