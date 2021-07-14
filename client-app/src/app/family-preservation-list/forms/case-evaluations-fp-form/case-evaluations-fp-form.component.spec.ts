import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseEvaluationsFpFormComponent } from './case-evaluations-fp-form.component';

describe('CaseEvaluationsFpFormComponent', () => {
  let component: CaseEvaluationsFpFormComponent;
  let fixture: ComponentFixture<CaseEvaluationsFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseEvaluationsFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseEvaluationsFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
