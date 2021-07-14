import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionMakingFunctionalAssessmentComponent } from './decision-making-functional-assessment.component';

describe('DecisionMakingFunctionalAssessmentComponent', () => {
  let component: DecisionMakingFunctionalAssessmentComponent;
  let fixture: ComponentFixture<DecisionMakingFunctionalAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionMakingFunctionalAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionMakingFunctionalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
