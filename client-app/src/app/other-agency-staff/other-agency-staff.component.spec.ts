import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAgencyStaffComponent } from './other-agency-staff.component';

describe('OtherAgencyStaffComponent', () => {
  let component: OtherAgencyStaffComponent;
  let fixture: ComponentFixture<OtherAgencyStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherAgencyStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherAgencyStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
