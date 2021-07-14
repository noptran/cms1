import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementPlanComponent } from './achievement-plan.component';

describe('AchievementPlanComponent', () => {
  let component: AchievementPlanComponent;
  let fixture: ComponentFixture<AchievementPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
