import { TestBed, inject } from '@angular/core/testing';

import { PagesizeService } from './pagesize.service';

describe('PagesizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagesizeService]
    });
  });

  it('should be created', inject([PagesizeService], (service: PagesizeService) => {
    expect(service).toBeTruthy();
  }));
});
