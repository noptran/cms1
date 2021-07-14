import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAgencyStaffFormComponent } from './other-agency-staff-form.component';

describe('OtherAgencyStaffFormComponent', () => {
  let component: OtherAgencyStaffFormComponent;
  let fixture: ComponentFixture<OtherAgencyStaffFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherAgencyStaffFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherAgencyStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
