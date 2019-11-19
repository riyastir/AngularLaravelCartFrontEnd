import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  @Input() getSearchStatus: boolean;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();
  products;
  data;
  cartItems;
  qty;
  user_id;
  countItem;
  alert;
  staticAlertClosed = true;
  type;
  constructor(private apiService: ApiService, private router: Router, private appMain: AppComponent) { }
  setStatus(status: boolean) {
    this.getSearchStatus = status;
    this.getSearchStatusChange.emit(status);
  }
  ngOnInit() {
    this.router.onSameUrlNavigation = 'reload';
    this.apiService.getProducts().subscribe((products) => {
      console.log(products['response']);
      this.products = products['response'];
    });
  }
  public addToCart(product_id) {
    this.alert = 'Item added to cart !';
    this.type='success';
    this.staticAlertClosed = false;
    this.user_id = localStorage.getItem('user_id');
    this.setStatus(false);
    if (this.user_id != '') {
      this.qty = (<HTMLInputElement>document.getElementById('qty_' + product_id)).value;
      console.log(this.user_id, product_id, this.qty);
      this.apiService.addToCart(product_id, this.qty).subscribe((data) => {
        console.log(data['response']);
        this.data = data['response'];
        this.apiService.viewCart().subscribe((data) => {
          console.log(data['response']);
          this.countItem = data['response'];
          this.appMain.cartItems = this.countItem.count;
        });
        this.router.navigateByUrl('/products');
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
}
