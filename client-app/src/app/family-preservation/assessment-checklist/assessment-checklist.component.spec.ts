import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentChecklistComponent } from './assessment-checklist.component';

describe('AssessmentChecklistComponent', () => {
  let component: AssessmentChecklistComponent;
  let fixture: ComponentFixture<AssessmentChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
