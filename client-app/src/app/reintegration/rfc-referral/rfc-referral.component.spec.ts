import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfcReferralComponent } from './rfc-referral.component';

describe('RfcReferralComponent', () => {
  let component: RfcReferralComponent;
  let fixture: ComponentFixture<RfcReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfcReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfcReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
