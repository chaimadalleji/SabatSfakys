import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginVendeurPage } from './login-vendeur.page';

describe('LoginVendeurPage', () => {
  let component: LoginVendeurPage;
  let fixture: ComponentFixture<LoginVendeurPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
