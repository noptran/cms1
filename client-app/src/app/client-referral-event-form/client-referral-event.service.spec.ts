import { TestBed, inject } from '@angular/core/testing';

import { ClientReferralEventService } from './client-referral-event.service';

describe('ClientReferralEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientReferralEventService]
    });
  });

  it('should be created', inject([ClientReferralEventService], (service: ClientReferralEventService) => {
    expect(service).toBeTruthy();
  }));
});
