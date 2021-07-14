import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanencyPlanReviewComponent } from './permanency-plan-review.component';

describe('PermanencyPlanReviewComponent', () => {
  let component: PermanencyPlanReviewComponent;
  let fixture: ComponentFixture<PermanencyPlanReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanencyPlanReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanencyPlanReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
