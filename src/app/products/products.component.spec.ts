import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockRouter:any;
  class MockRouter {
      //noinspection TypeScriptUnresolvedFunction
      navigate = jasmine.createSpy('navigate');
  }
  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [ NgbModule,HttpClientModule, RouterTestingModule],
      providers: [AppComponent,{ provide: RouterTestingModule, useValue: mockRouter }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
