import { TestBed, inject } from '@angular/core/testing';

import { OpencardsService } from './opencards.service';

describe('OpencardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpencardsService]
    });
  });

  it('should be created', inject([OpencardsService], (service: OpencardsService) => {
    expect(service).toBeTruthy();
  }));
});
