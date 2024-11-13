import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreditCardComponent } from './customer-credit-card.component';

describe('CustomerCreditCardComponent', () => {
  let component: CustomerCreditCardComponent;
  let fixture: ComponentFixture<CustomerCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCreditCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
