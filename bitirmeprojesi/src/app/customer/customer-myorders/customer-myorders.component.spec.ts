import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMyordersComponent } from './customer-myorders.component';

describe('CustomerMyordersComponent', () => {
  let component: CustomerMyordersComponent;
  let fixture: ComponentFixture<CustomerMyordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMyordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
