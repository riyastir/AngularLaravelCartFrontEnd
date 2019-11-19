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
  public addToCart(user_id,product_id,qty){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/cart/add`,{
			"user_id":user_id,
			"product_id":product_id,
			"quantity":qty
  },options);
  }
  public viewCart(user_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/cart/view`,{
			"user_id":user_id
	},options);
  }
  public clearCart(user_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/cart/clear`,{
			"user_id":user_id
	},options);
  }
  public removeItem(user_id,product_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/cart/remove`,{
      "user_id":user_id,
      "product_id":product_id
	},options);
  }

  public createOrder(user_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token') });
    let options = { headers: headers };
    return this.httpClient.post(`https://api.cart.riyas.pro/api/order/create`,{
      "user_id":user_id
	},options);
  }

  public login(email,password){
    return this.httpClient.post(`https://api.cart.riyas.pro/api/login`,{
      "email":email,
      "password":password
	})
  }
}
