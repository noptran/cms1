import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherServiceBatchAccountPayableComponent } from './add-other-service-batch-account-payable.component';

describe('AddOtherServiceBatchAccountPayableComponent', () => {
  let component: AddOtherServiceBatchAccountPayableComponent;
  let fixture: ComponentFixture<AddOtherServiceBatchAccountPayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOtherServiceBatchAccountPayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtherServiceBatchAccountPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
