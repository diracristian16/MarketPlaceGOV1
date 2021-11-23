import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Pagos } from '../models/pagos';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  list!: Pagos[];
  myApiUrl = 'api/payments/payments/';
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



  guardarPayment(payment: any): Observable<Order>{
    this.authToken();
    //console.log("lelgo al sevicio");
    //console.log(Number(localStorage.getItem('paymentId'))+"id orden")
    return this.http.put<any>(this.myApiUrl+'/'+Number(localStorage.getItem('paymentId')), payment, {headers: this.headers});
  }

  obtenerPagos(){
    console.log('aca ingreso al obtener ordenes');
    this.http.get(this.myApiUrl,{headers: this.headers}).toPromise()
    .then(data =>{
      console.log(data);
      this.list = data as Pagos[];
    });
  }
}
