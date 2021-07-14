import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRecruitmentPlanComponent } from './individual-recruitment-plan.component';

describe('IndividualRecruitmentPlanComponent', () => {
  let component: IndividualRecruitmentPlanComponent;
  let fixture: ComponentFixture<IndividualRecruitmentPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualRecruitmentPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRecruitmentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
