import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  alert;
  staticAlertClosed = true;
  items;
  total;
  clear;
  remove;
  data;
  itemsCount = 0;
  cartMessage = 'Your Cart is Loading...';
  userId = localStorage.getItem('user_id');
  constructor(private apiService: ApiService,private router: Router,private appMain: AppComponent) { 
    
  }

  ngOnInit(){
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this.router.onSameUrlNavigation = 'reload';
    this.apiService.viewCart(this.userId).subscribe((items)=>{
      console.log(items['response']['items'].length);
      this.itemsCount = items['response']['items'].length;
      if(this.itemsCount == 0){
        this.cartMessage = 'Your Cart is Empty';
      }
      this.items = items['response']['items'];
      this.total = items['response']['total'];
    });
	}
  public clearCart(user_id){
    this.alert = 'Your Cart is Cleared !';
    this.staticAlertClosed = false;
    this.itemsCount = 0;
    this.cartMessage = 'Your Cart is Loading';
    this.apiService.clearCart(user_id).subscribe((data)=>{
		  console.log(data['response']['status']);
      this.clear = data['response']['status'];
      this.apiService.viewCart(this.userId).subscribe((items)=>{
        console.log(items['response']['items'].length);
        this.itemsCount = items['response']['items'].length;
        this.appMain.cartItems = this.itemsCount;
        if(this.itemsCount == 0){
          this.cartMessage = 'Your Cart is Empty';
        }
        this.items = items['response']['items'];
        this.total = items['response']['total'];
        this.data = data['response'];
      });
    });
    
  }
  public removeItem(user_id,product_id){
    this.alert = 'You removed an item from your cart !';
    this.staticAlertClosed = false;
    this.apiService.removeItem(user_id,product_id).subscribe((data)=>{
		  console.log(data['response']['status']);
      this.remove = data['response']['status'];
      this.apiService.viewCart(this.userId).subscribe((items)=>{
        console.log(items['response']['items'].length);
        this.itemsCount = items['response']['items'].length;
        this.appMain.cartItems = this.itemsCount;
        this.items = items['response']['items'];
        this.total = items['response']['total'];
        this.data = data['response'];
      });
    });
    
  }

  public createOrder(){
    this.alert = 'Your Order Placed !';
    this.staticAlertClosed = false;
    this.itemsCount = 0;
    this.cartMessage = 'Your Cart is Clearing';
    this.apiService.createOrder(this.userId).subscribe((data)=>{
		  console.log(data['response']);
      this.remove = data['response'];
      this.apiService.clearCart(this.userId).subscribe((data)=>{
        console.log(data['response']['status']);
        this.clear = data['response']['status'];
      });
      this.apiService.viewCart(this.userId).subscribe((items)=>{
        console.log(items['response']['items'].length);
        this.itemsCount = items['response']['items'].length;
        this.appMain.cartItems = this.itemsCount;
        if(this.itemsCount == 0){
          this.cartMessage = 'Your Cart is Empty';
        }
        this.items = items['response']['items'];
        this.total = items['response']['total'];
        this.data = data['response'];
      });
    });
    
  }
}
