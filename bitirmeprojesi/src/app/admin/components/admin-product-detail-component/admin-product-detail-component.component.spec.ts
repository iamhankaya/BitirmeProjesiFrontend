import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductDetailComponentComponent } from './admin-product-detail-component.component';

describe('AdminProductDetailComponentComponent', () => {
  let component: AdminProductDetailComponentComponent;
  let fixture: ComponentFixture<AdminProductDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
