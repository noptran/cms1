import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementSupportPlanComponent } from './placement-support-plan.component';

describe('PlacementSupportPlanComponent', () => {
  let component: PlacementSupportPlanComponent;
  let fixture: ComponentFixture<PlacementSupportPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementSupportPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementSupportPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
