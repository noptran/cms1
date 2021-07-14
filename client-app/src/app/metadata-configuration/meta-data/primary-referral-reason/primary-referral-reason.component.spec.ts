import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryReferralReasonComponent } from './primary-referral-reason.component';

describe('PrimaryReferralReasonComponent', () => {
  let component: PrimaryReferralReasonComponent;
  let fixture: ComponentFixture<PrimaryReferralReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryReferralReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryReferralReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
