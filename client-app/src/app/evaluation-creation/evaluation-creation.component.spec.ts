import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCreationComponent } from './evaluation-creation.component';

describe('EvaluationCreationComponent', () => {
  let component: EvaluationCreationComponent;
  let fixture: ComponentFixture<EvaluationCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
