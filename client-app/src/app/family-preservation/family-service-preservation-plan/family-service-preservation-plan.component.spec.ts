import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyServicePreservationPlanComponent } from './family-service-preservation-plan.component';

describe('FamilyServicePreservationPlanComponent', () => {
  let component: FamilyServicePreservationPlanComponent;
  let fixture: ComponentFixture<FamilyServicePreservationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyServicePreservationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyServicePreservationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
