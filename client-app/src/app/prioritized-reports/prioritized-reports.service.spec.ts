import { TestBed, inject } from '@angular/core/testing';

import { PrioritizedReportsService } from './prioritized-reports.service';

describe('PrioritizedReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrioritizedReportsService]
    });
  });

  it('should be created', inject([PrioritizedReportsService], (service: PrioritizedReportsService) => {
    expect(service).toBeTruthy();
  }));
});
