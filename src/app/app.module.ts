import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './component/contact/contact.component';
import { BlogComponent } from './component/blog/blog.component';
import { ClothesComponent } from './component/clothes/clothes.component';
import { AppliancesComponent } from './component/appliances/appliances.component';
import { TechnologyComponent } from './component/technology/technology.component';
import { LoginComponent } from './component/login/login.component';
import { ListCustomerComponent } from './component/customer/list-customer/list-customer.component';
import { CreateCustomerComponent } from './component/customer/create-customer/create-customer.component';
import { CustomerComponent } from './component/customer/customer.component';
import { HomeComponent } from './component/home/home.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { CreateInventoryComponent } from './component/inventory/create-inventory/create-inventory.component';
import { ListInventoryComponent } from './component/inventory/list-inventory/list-inventory.component';
import { PaymentsComponent } from './component/payments/payments.component';
import { OrdenesComponent } from './component/ordenes/ordenes.component';
import { PagosComponent } from './component/pagos/pagos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    ContactComponent,
    BlogComponent,
    ClothesComponent,
    AppliancesComponent,
    TechnologyComponent,
    LoginComponent,
    ListCustomerComponent,
    CreateCustomerComponent,
    CustomerComponent,
    HomeComponent,
    InventoryComponent,
    CreateInventoryComponent,
    ListInventoryComponent,
    PaymentsComponent,
    OrdenesComponent,
    PagosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
