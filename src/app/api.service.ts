import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  error;
	basic = 'Bearer '+localStorage.getItem('token');
  constructor(private httpClient: HttpClient) { }
  public getProducts(){
    return this.httpClient.get(`https://api.cart.riyas.pro/api/products`);
  }
  public addToCart(product_id,qty){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/cart/add`,{
			"product_id":product_id,
			"quantity":qty
  },options);
  }
  public viewCart(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/cart/view`,{},options);
  }
  public clearCart(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/cart/clear`,{},options);
  }
  public removeItem(product_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/cart/remove`,{
      "product_id":product_id
	},options);
  }

  public createOrder(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/order/create`,{},options);
  }

  public login(email,password){
    return this.httpClient.post(`https://api.cart.riyas.pro/api/login`,{
      "email":email,
      "password":password
	})
  }
}
