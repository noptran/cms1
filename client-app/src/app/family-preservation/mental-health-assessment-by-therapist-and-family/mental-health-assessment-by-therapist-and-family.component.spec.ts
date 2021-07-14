import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentalHealthAssessmentByTherapistAndFamilyComponent } from './mental-health-assessment-by-therapist-and-family.component';

describe('MentalHealthAssessmentByTherapistAndFamilyComponent', () => {
  let component: MentalHealthAssessmentByTherapistAndFamilyComponent;
  let fixture: ComponentFixture<MentalHealthAssessmentByTherapistAndFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentalHealthAssessmentByTherapistAndFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentalHealthAssessmentByTherapistAndFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
