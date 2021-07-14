import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialFamilyAssessmentComponent } from './initial-family-assessment.component';

describe('InitialFamilyAssessmentComponent', () => {
  let component: InitialFamilyAssessmentComponent;
  let fixture: ComponentFixture<InitialFamilyAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialFamilyAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialFamilyAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
