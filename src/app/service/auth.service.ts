import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static login: any;

  constructor(private http : HttpClient) { }

  login(){
    //console.log(data);
    let parametros = new HttpParams();
    parametros = parametros.append('grant_type','password');
    parametros = parametros.append('username','admin');
    parametros = parametros.append('password','12345');

    const opciones = {
      headers: new HttpHeaders({
        //'Content-Type':'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZnJvbnRlbmRhcHA6MTIzNDU='
      }),
      params: parametros
    };


    return this.http.post<any>("api/security/oauth/token",opciones, opciones )
    .pipe(map((res:any)=>{
      console.log("hola estoy en auth");
      localStorage.setItem('tokenid', res.access_token);
      return res
    }))
  }
}
