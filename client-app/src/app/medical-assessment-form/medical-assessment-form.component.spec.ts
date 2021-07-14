import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAssessmentFormComponent } from './medical-assessment-form.component';

describe('MedicalAssessmentFormComponent', () => {
  let component: MedicalAssessmentFormComponent;
  let fixture: ComponentFixture<MedicalAssessmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalAssessmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAssessmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
