import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReferralEventFormComponent } from './client-referral-event-form.component';

describe('ClientReferralEventFormComponent', () => {
  let component: ClientReferralEventFormComponent;
  let fixture: ComponentFixture<ClientReferralEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientReferralEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReferralEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
