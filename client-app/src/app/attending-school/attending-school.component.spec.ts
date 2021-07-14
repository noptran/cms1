import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendingSchoolComponent } from './attending-school.component';

describe('AttendingSchoolComponent', () => {
  let component: AttendingSchoolComponent;
  let fixture: ComponentFixture<AttendingSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendingSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendingSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
