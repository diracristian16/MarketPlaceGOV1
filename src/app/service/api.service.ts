import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public tokenList : any ;

  constructor(private http : HttpClient, private authService: AuthService) { }


  protected headers= new HttpHeaders({
    'Authorization': 'Bearer '+localStorage.getItem('tokenid')
  });

  getProductFilterClothes(){
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
