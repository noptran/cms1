import { TestBed } from '@angular/core/testing';

import { EducationEnrollmentService } from './education-enrollment.service';

describe('EducationEnrollmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducationEnrollmentService = TestBed.get(EducationEnrollmentService);
    expect(service).toBeTruthy();
  });
});
