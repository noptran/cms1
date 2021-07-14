import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisoryStaffingFormNodeComponent } from './supervisory-staffing-form-node.component';

describe('SupervisoryStaffingFormNodeComponent', () => {
  let component: SupervisoryStaffingFormNodeComponent;
  let fixture: ComponentFixture<SupervisoryStaffingFormNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisoryStaffingFormNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisoryStaffingFormNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
