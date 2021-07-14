import { TestBed } from '@angular/core/testing';

import { BatchProcessingService } from './batch-processing.service';

describe('BatchProcessingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchProcessingService = TestBed.get(BatchProcessingService);
    expect(service).toBeTruthy();
  });
});
