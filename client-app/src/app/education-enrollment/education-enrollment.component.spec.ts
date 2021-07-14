import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationEnrollmentComponent } from './education-enrollment.component';

describe('EducationEnrollmentComponent', () => {
  let component: EducationEnrollmentComponent;
  let fixture: ComponentFixture<EducationEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
