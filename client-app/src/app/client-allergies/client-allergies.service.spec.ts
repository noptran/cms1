import { TestBed, inject } from '@angular/core/testing';

import { ClientAllergiesService } from './client-allergies.service';

describe('ClientAllergiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientAllergiesService]
    });
  });

  it('should be created', inject([ClientAllergiesService], (service: ClientAllergiesService) => {
    expect(service).toBeTruthy();
  }));
});
