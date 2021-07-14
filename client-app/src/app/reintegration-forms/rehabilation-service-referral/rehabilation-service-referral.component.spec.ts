import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilationServiceReferralComponent } from './rehabilation-service-referral.component';

describe('RehabilationServiceReferralComponent', () => {
  let component: RehabilationServiceReferralComponent;
  let fixture: ComponentFixture<RehabilationServiceReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabilationServiceReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehabilationServiceReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
