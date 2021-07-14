import { TestBed, inject } from '@angular/core/testing';

import { MedicationAllergiesService } from './medication-allergies.service';

describe('MedicationAllergiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicationAllergiesService]
    });
  });

  it('should be created', inject([MedicationAllergiesService], (service: MedicationAllergiesService) => {
    expect(service).toBeTruthy();
  }));
});
