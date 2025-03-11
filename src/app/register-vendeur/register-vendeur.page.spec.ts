import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterVendeurPage } from './register-vendeur.page';

describe('RegisterVendeurPage', () => {
  let component: RegisterVendeurPage;
  let fixture: ComponentFixture<RegisterVendeurPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
