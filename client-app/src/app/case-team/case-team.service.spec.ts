import { TestBed, inject } from '@angular/core/testing';

import { CaseTeamService } from './case-team.service';

describe('CaseTeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseTeamService]
    });
  });

  it('should be created', inject([CaseTeamService], (service: CaseTeamService) => {
    expect(service).toBeTruthy();
  }));
});
