import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';

const appRoutes: Routes = [
  { 
   path: '',
   redirectTo: '/products',
   pathMatch: 'full'
  },	
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products' }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart' }
  }
];
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    CartIconComponent
  ],
  imports: [
	RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
	NgbModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
