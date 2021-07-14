import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGradeSubmissionComponent } from './client-grade-submission.component';

describe('ClientGradeSubmissionComponent', () => {
  let component: ClientGradeSubmissionComponent;
  let fixture: ComponentFixture<ClientGradeSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGradeSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGradeSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
