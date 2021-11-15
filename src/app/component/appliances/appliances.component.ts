import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-appliances',
  templateUrl: './appliances.component.html',
  styleUrls: ['./appliances.component.scss']
})
export class AppliancesComponent implements OnInit {

  baseEndPoint =  'http://10.43.100.180:3740/products';
  public productList : any ;
  public filterCategory : any;
  public products: any =[];
  searchKey:string ="";
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProductFilterAppliances()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.precio});
      });
     // console.log(this.productList);
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
