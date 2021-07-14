import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPlanUpdateComponent } from './treatment-plan-update.component';

describe('TreatmentPlanUpdateComponent', () => {
  let component: TreatmentPlanUpdateComponent;
  let fixture: ComponentFixture<TreatmentPlanUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentPlanUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentPlanUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
