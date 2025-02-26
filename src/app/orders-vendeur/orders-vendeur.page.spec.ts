import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersVendeurPage } from './orders-vendeur.page';

describe('OrdersVendeurPage', () => {
  let component: OrdersVendeurPage;
  let fixture: ComponentFixture<OrdersVendeurPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
