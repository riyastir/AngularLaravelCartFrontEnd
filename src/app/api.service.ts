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
    return this.httpClient.get(`http://127.0.0.1:8000/api/products`);
  }
  public addToCart(user_id,product_id,qty){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basic });
    let options = { headers: headers };
    return this.httpClient.post(`http://127.0.0.1:8000/api/cart/add`,{
			"user_id":user_id,
			"product_id":product_id,
			"quantity":qty
  },options);
  }
  public viewCart(user_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basic });
    let options = { headers: headers };
    return this.httpClient.post(`http://127.0.0.1:8000/api/cart/view`,{
			"user_id":user_id
	},options);
  }
  public clearCart(user_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basic });
    let options = { headers: headers };
    return this.httpClient.post(`http://127.0.0.1:8000/api/cart/clear`,{
			"user_id":user_id
	},options);
  }
  public removeItem(user_id,product_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basic });
    let options = { headers: headers };
    return this.httpClient.post(`http://127.0.0.1:8000/api/cart/remove`,{
      "user_id":user_id,
      "product_id":product_id
	},options);
  }

  public createOrder(user_id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basic });
    let options = { headers: headers };
    return this.httpClient.post(`http://127.0.0.1:8000/api/order/create`,{
      "user_id":user_id
	},options);
  }

  public login(email,password){
    return this.httpClient.post(`http://127.0.0.1:8000/api/login`,{
      "email":email,
      "password":password
	})
  }
}
