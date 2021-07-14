import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCareFormComponent } from './customer-care-form.component';

describe('CustomerCareFormComponent', () => {
  let component: CustomerCareFormComponent;
  let fixture: ComponentFixture<CustomerCareFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCareFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
