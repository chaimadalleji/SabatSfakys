import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProductsPage } from './manage-products.page';

describe('ManageProductsPage', () => {
  let component: ManageProductsPage;
  let fixture: ComponentFixture<ManageProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
