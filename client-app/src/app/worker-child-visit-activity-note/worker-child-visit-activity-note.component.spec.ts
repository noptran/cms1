import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerChildVisitActivityNoteComponent } from './worker-child-visit-activity-note.component';

describe('WorkerChildVisitActivityNoteComponent', () => {
  let component: WorkerChildVisitActivityNoteComponent;
  let fixture: ComponentFixture<WorkerChildVisitActivityNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerChildVisitActivityNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerChildVisitActivityNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
