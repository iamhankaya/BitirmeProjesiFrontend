import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserComponentComponent } from './admin-user-component.component';

describe('AdminUserComponentComponent', () => {
  let component: AdminUserComponentComponent;
  let fixture: ComponentFixture<AdminUserComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
