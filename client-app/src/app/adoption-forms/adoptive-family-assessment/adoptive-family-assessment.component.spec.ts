import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptiveFamilyAssessmentComponent } from './adoptive-family-assessment.component';

describe('AdoptiveFamilyAssessmentComponent', () => {
  let component: AdoptiveFamilyAssessmentComponent;
  let fixture: ComponentFixture<AdoptiveFamilyAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptiveFamilyAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptiveFamilyAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
