import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisoryStaffingFormForSupervisorsComponent } from './supervisory-staffing-form-for-supervisors.component';

describe('SupervisoryStaffingFormForSupervisorsComponent', () => {
  let component: SupervisoryStaffingFormForSupervisorsComponent;
  let fixture: ComponentFixture<SupervisoryStaffingFormForSupervisorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisoryStaffingFormForSupervisorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisoryStaffingFormForSupervisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
