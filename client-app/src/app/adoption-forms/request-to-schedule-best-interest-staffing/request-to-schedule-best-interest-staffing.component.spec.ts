import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToScheduleBestInterestStaffingComponent } from './request-to-schedule-best-interest-staffing.component';

describe('RequestToScheduleBestInterestStaffingComponent', () => {
  let component: RequestToScheduleBestInterestStaffingComponent;
  let fixture: ComponentFixture<RequestToScheduleBestInterestStaffingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestToScheduleBestInterestStaffingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToScheduleBestInterestStaffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
