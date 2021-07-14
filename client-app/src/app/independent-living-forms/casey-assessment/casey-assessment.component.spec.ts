import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseyAssessmentComponent } from './casey-assessment.component';

describe('CaseyAssessmentComponent', () => {
  let component: CaseyAssessmentComponent;
  let fixture: ComponentFixture<CaseyAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseyAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseyAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
