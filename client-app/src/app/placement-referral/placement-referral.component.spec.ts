import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementReferralComponent } from './placement-referral.component';

describe('PlacementReferralComponent', () => {
  let component: PlacementReferralComponent;
  let fixture: ComponentFixture<PlacementReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
