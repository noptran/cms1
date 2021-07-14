import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementPlanComponent } from './placement-plan.component';

describe('PlacementPlanComponent', () => {
  let component: PlacementPlanComponent;
  let fixture: ComponentFixture<PlacementPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
