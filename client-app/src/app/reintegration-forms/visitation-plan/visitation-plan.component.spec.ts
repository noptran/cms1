import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitationPlanComponent } from './visitation-plan.component';

describe('VisitationPlanComponent', () => {
  let component: VisitationPlanComponent;
  let fixture: ComponentFixture<VisitationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
