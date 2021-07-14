import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReferralEventComponent } from './client-referral-event.component';

describe('ClientReferralEventComponent', () => {
  let component: ClientReferralEventComponent;
  let fixture: ComponentFixture<ClientReferralEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientReferralEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReferralEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
