import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KinshipVisitationPlanComponent } from './kinship-visitation-plan.component';

describe('KinshipVisitationPlanComponent', () => {
  let component: KinshipVisitationPlanComponent;
  let fixture: ComponentFixture<KinshipVisitationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KinshipVisitationPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KinshipVisitationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
