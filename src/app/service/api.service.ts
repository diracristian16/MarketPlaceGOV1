import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public tokenList : any ;
  public listdata: any;

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

  getProductFilterClothes(){
    this.authToken();
    return this.http.get<any>("api/products/products/filtrar/categoria/ropa",  { headers: this.headers } )
    .pipe(map((res:any)=>{

      return res;
    }))
  }

  getProductFilterAppliances(){
    return this.http.get<any>("api/products/products/filtrar/categoria/electrodomesticos",  { headers: this.headers } )
    .pipe(map((res:any)=>{

      return res;
    }))
  }

  getProductFilterTecnology(){
    return this.http.get<any>("api/products/products/filtrar/categoria/tecnologia",  { headers: this.headers } )
    .pipe(map((res:any)=>{

      return res;
    }))
  }

  getProduct(){
    return this.http.get<any>("api/products/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }



}
