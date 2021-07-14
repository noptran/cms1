import { TestBed, inject } from '@angular/core/testing';

import { ClientStrengthService } from './client-strength.service';

describe('ClientStrengthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientStrengthService]
    });
  });

  it('should be created', inject([ClientStrengthService], (service: ClientStrengthService) => {
    expect(service).toBeTruthy();
  }));
});
