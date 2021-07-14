import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHearingExhibitComponent } from './review-hearing-exhibit.component';

describe('ReviewHearingExhibitComponent', () => {
  let component: ReviewHearingExhibitComponent;
  let fixture: ComponentFixture<ReviewHearingExhibitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewHearingExhibitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewHearingExhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
