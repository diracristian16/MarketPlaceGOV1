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
import { HomeComponent } from './component/home/home.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { PaymentsComponent } from './component/payments/payments.component';
import { OrdenesComponent } from './component/ordenes/ordenes.component';
import { PagosComponent } from './component/pagos/pagos.component';

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
  {path:'home', component: HomeComponent},
  {path:'inventory', component: InventoryComponent},
  {path:'payments', component: PaymentsComponent},
  {path:'ordenes', component: OrdenesComponent},
  {path:'pagos', component: PagosComponent},
  {path:'customer', component: CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
