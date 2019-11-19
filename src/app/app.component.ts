import { Component,OnInit, Input } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isSearchActive = true;
  title = 'cart';
  data = [];
  cartItems;
  userName = localStorage.getItem('user_name');
  if(isSearchActive = false){
    this.apiService.viewCart().subscribe((data)=>{
      console.log(data['response']);
      this.data = data['response'];
    });
  }
  constructor(private apiService: ApiService,private router: Router){}
  ngOnInit(){
    this.apiService.viewCart().subscribe((data)=>{
      console.log(data['response']);
      this.data = data['response'];
      this.cartItems = this.data['count'];
    });
}
public logout(){
  localStorage.user_id = '';
  localStorage.user_name = '';
  localStorage.token = '';
  this.userName = '';
  this.cartItems = '';
  this.router.navigateByUrl('/login');
}
}