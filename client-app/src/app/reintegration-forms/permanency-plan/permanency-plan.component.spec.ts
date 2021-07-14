import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanencyPlanComponent } from './permanency-plan.component';

describe('PermanencyPlanComponent', () => {
  let component: PermanencyPlanComponent;
  let fixture: ComponentFixture<PermanencyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanencyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanencyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
