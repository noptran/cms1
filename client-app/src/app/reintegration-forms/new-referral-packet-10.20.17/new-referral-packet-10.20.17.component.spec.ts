import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReferralPacket10Component } from './new-referral-packet-10.20.17.component';

describe('NewReferralPacket10Component', () => {
  let component: NewReferralPacket10Component;
  let fixture: ComponentFixture<NewReferralPacket10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReferralPacket10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReferralPacket10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
