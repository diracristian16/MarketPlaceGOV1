import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  myApiUrl = 'api/products/products';
  myApiUrlFoto = 'api/products/products/editar-foto';
  myApiUrlCreate = 'api/products/products';
  list!: Product[];
  private actualizarFormulario = new BehaviorSubject<Product>({} as any);

  constructor(private http : HttpClient, private authService: AuthService) { }

  authToken(){
    //console.log(localStorage.getItem('tokenid')+"ojo este es el token");
    const valAuth = localStorage.getItem('tokenid');
    console.log(valAuth+"ojo este es el token seteado");
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

  obtenerProducts(){
    //console.log('aca ingreso al obtener customersss');
    this.http.get(this.myApiUrl).toPromise()
    .then(data =>{
      //console.log(data+'ohohohohoho');
      this.list = data as Product[];
    });
  }



  guardarProduct(product: Product): Observable<Product>{
    this.authToken();
    console.log(product);
    return this.http.post<Product>(this.myApiUrlCreate, product, {headers: this.headers});
  }

  eliminarProduct(id: string):Observable<Product>{
    return this.http.delete<Product>(this.myApiUrl+"/"+id, {headers: this.headers});

  }

  actualizarProduct(id: string, customer: Product):Observable<Product>{

    return this.http.put<Product>(this.myApiUrlFoto+"/"+id, Product, {headers: this.headers});

  }


  actualizar(id: string,product: any){
    this.actualizarFormulario.next(product);
  }

  obtenerInventory$(): Observable<Product>{
    return this.actualizarFormulario.asObservable();
  }
}
