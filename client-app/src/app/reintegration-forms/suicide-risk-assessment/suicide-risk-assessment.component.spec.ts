import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuicideRiskAssessmentComponent } from './suicide-risk-assessment.component';

describe('SuicideRiskAssessmentComponent', () => {
  let component: SuicideRiskAssessmentComponent;
  let fixture: ComponentFixture<SuicideRiskAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuicideRiskAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuicideRiskAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
