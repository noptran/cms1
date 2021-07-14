import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReintegrationPlanComponent } from './reintegration-plan.component';

describe('ReintegrationPlanComponent', () => {
  let component: ReintegrationPlanComponent;
  let fixture: ComponentFixture<ReintegrationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReintegrationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReintegrationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
