import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter:any;
  class MockRouter {
      //noinspection TypeScriptUnresolvedFunction
      navigate = jasmine.createSpy('navigate');
  }
  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ NgbModule, HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [AppComponent,{ provide: RouterTestingModule, useValue: mockRouter }]
    })
    .compileComponents();
  }));
  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Login Component Created', () => {
    expect(component).toBeTruthy();
  });

  it('Login initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('Submitted flag should be true when onSubmit()', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('Form value should update from when you change the input', (() => {
    updateForm('test@test.com', 'abcd1234');
    expect(component.loginForm.value).toEqual({ email: 'test@test.com', password: 'abcd1234' });
  }));

  it('Form invalid should be true when null value is passed', (() => {
    updateForm('', '');
    expect(component.loginForm.invalid).toBeTruthy();
  }));
  it('created a form with username and password input and login button', () => {
    const emailInput = fixture.debugElement.nativeElement.querySelector('#email');
    const passwordInput = fixture.debugElement.nativeElement.querySelector('#password');
    const loginBtnInput = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginBtnInput).toBeDefined();
  });
  it('Display Username Error Msg when Username is blank and verify the message is "Email is Required"', () => {
    updateForm('', 'abc1234');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    button.click();
    fixture.detectChanges();

    const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('#emailErrorMsg');
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Email is required');
  });
  it('Display Password Error Msg when Password is blank and verify the message is "Password is Required"', () => {
    updateForm('test@test.com', '');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#passwordErrorMsg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Password is required');
  });

  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm('','');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    button.click();
    fixture.detectChanges();

    const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('#emailErrorMsg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#passwordErrorMsg');

    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Email is required');

    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Password is required');
  });
});
