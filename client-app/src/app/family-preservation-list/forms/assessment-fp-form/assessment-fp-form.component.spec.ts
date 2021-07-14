import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFpFormComponent } from './assessment-fp-form.component';

describe('AssessmentFpFormComponent', () => {
  let component: AssessmentFpFormComponent;
  let fixture: ComponentFixture<AssessmentFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
