import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { ContactComponent } from './component/contact/contact.component';
import { BlogComponent } from './component/blog/blog.component';
import { ClothesComponent } from './component/clothes/clothes.component';
import { TechnologyComponent } from './component/technology/technology.component';
import { AppliancesComponent } from './component/appliances/appliances.component';
import { LoginComponent } from './component/login/login.component';
import { CustomerComponent } from './component/customer/customer.component';

const routes: Routes = [
  {path:'', redirectTo:'products',pathMatch:'full'},
  {path:'products', component: ProductsComponent},
  {path:'contact', component: ContactComponent},
  {path:'blog', component:BlogComponent},
  {path:'clothes', component:ClothesComponent},
  {path:'technology', component:TechnologyComponent},
  {path:'appliances', component:AppliancesComponent},
  {path:'login',component:LoginComponent},
  {path:'cart', component: CartComponent},
  {path:'customer', component: CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
