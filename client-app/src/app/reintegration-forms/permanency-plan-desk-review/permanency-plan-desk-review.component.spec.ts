import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanencyPlanDeskReviewComponent } from './permanency-plan-desk-review.component';

describe('PermanencyPlanDeskReviewComponent', () => {
  let component: PermanencyPlanDeskReviewComponent;
  let fixture: ComponentFixture<PermanencyPlanDeskReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanencyPlanDeskReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanencyPlanDeskReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
