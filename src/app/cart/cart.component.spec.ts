import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { ApiService } from '../api.service';
import { CartComponent } from './cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { AppComponent } from '../app.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockRouter:any;
    class MockRouter {
        //noinspection TypeScriptUnresolvedFunction
        navigate = jasmine.createSpy('navigate');
  }
  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ NgbModule,HttpClientModule,RouterTestingModule ],
      providers: [AppComponent,{ provide: RouterTestingModule, useValue: mockRouter },ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
