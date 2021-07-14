import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisoryStaffingComponent } from './supervisory-staffing.component';

describe('SupervisoryStaffingComponent', () => {
  let component: SupervisoryStaffingComponent;
  let fixture: ComponentFixture<SupervisoryStaffingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisoryStaffingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisoryStaffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
