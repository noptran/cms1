import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfSufficiencyPlanComponent } from './self-sufficiency-plan.component';

describe('SelfSufficiencyPlanComponent', () => {
  let component: SelfSufficiencyPlanComponent;
  let fixture: ComponentFixture<SelfSufficiencyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfSufficiencyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfSufficiencyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
