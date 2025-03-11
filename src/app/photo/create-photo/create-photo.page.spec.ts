import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePhotoPage } from './create-photo.page';

describe('CreatePhotoPage', () => {
  let component: CreatePhotoPage;
  let fixture: ComponentFixture<CreatePhotoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
