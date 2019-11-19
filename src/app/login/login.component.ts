import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
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
  staticAlertClosed = true;
  constructor(private apiService: ApiService,private router: Router, private appMain: AppComponent) { }

  ngOnInit() {
  }
  public login(email,password){
    this.alert = 'Logging In !';
    this.type='warning';
    this.staticAlertClosed = false;
    this.apiService.login(email,password).subscribe((data)=>{
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
      this.router.navigateByUrl('/products');
      }
		});
  }
}
