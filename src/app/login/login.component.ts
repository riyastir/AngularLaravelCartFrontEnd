import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  data;
  alert;
  type;
  countItem;
  staticAlertClosed = true;
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private apiService: ApiService,
    private router: Router, 
    private appMain: AppComponent,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    console.log('Clicked');
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.alert = 'Logging In !';
    this.type='warning';
    this.staticAlertClosed = false;
    this.apiService.login(this.f.email.value,this.f.password.value).subscribe((data)=>{
      if(data['status']=='401'){
        this.alert = 'Login Failed ! Check Username or Password';
        this.type='danger';
        this.staticAlertClosed = false;
      }
      else{
      this.alert = 'Login Success! Please wait we will redirect';
      this.type='success';
      this.staticAlertClosed = false;
      console.log(data['success']);
      this.data = data['success'];
      localStorage.user_id = data['success']['user_id'];
      localStorage.user_name = data['success']['name'];
      localStorage.token = data['success']['token'];
      this.appMain.userName = data['success']['name'];
      this.apiService.basic = 'Bearer '+localStorage.getItem('token');
      this.apiService.viewCart().subscribe((data) => {
        console.log(data['response']);
        this.countItem = data['response'];
        this.appMain.cartItems = this.countItem.count;
      });
      this.router.navigateByUrl('/products');
      }
		});
  }
}
