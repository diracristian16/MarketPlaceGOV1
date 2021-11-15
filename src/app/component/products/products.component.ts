import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  baseEndPoint =  'http://10.43.100.180:3740/products';
  public productList : any ;
  public filterCategory : any;
  public products: any =[];
  searchKey:string ="";
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.precio});
      });
      console.log(this.productList);
    });

    this.cartService.search.subscribe((val:any)=>{
     this.searchKey = val;
    })
  }

 addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  filter(categoria:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.categoria == categoria || categoria==''){
        return a;
      }
    })
  }

}
