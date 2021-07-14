import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCustodialParentAssessmentComponent } from './non-custodial-parent-assessment.component';

describe('NonCustodialParentAssessmentComponent', () => {
  let component: NonCustodialParentAssessmentComponent;
  let fixture: ComponentFixture<NonCustodialParentAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonCustodialParentAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonCustodialParentAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
