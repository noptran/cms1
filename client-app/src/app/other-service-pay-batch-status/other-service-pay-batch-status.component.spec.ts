import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherServicePayBatchStatusComponent } from './other-service-pay-batch-status.component';

describe('OtherServicePayBatchStatusComponent', () => {
  let component: OtherServicePayBatchStatusComponent;
  let fixture: ComponentFixture<OtherServicePayBatchStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherServicePayBatchStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherServicePayBatchStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
