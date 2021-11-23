import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  myApiUrl = 'api/orders/orders';
  list!: Order[];
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

  guardarOrder(order: any): Observable<Order>{
    this.authToken();
    console.log("lelgo al sevicio");
    return this.http.post<any>(this.myApiUrl, order, {headers: this.headers});
  }

  obtenerOrders(){
    console.log('aca ingreso al obtener ordenes');
    this.http.get(this.myApiUrl,{headers: this.headers}).toPromise()
    .then(data =>{
      console.log(data);
      this.list = data as Order[];
    });
  }
}
