import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeVendeurPage } from './home-vendeur.page';

describe('HomeVendeurPage', () => {
  let component: HomeVendeurPage;
  let fixture: ComponentFixture<HomeVendeurPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
