import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySafetyPlanReintegrationComponent } from './family-safety-plan-reintegration.component';

describe('FamilySafetyPlanReintegrationComponent', () => {
  let component: FamilySafetyPlanReintegrationComponent;
  let fixture: ComponentFixture<FamilySafetyPlanReintegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySafetyPlanReintegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySafetyPlanReintegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
