import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationScaleComponent } from './evaluation-scale.component';

describe('EvaluationScaleComponent', () => {
  let component: EvaluationScaleComponent;
  let fixture: ComponentFixture<EvaluationScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
