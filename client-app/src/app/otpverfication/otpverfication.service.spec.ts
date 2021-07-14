import { TestBed, inject } from '@angular/core/testing';

import { OtpverficationService } from './otpverfication.service';

describe('OtpverficationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtpverficationService]
    });
  });

  it('should be created', inject([OtpverficationService], (service: OtpverficationService) => {
    expect(service).toBeTruthy();
  }));
});
