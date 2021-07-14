import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressNotesFpFormComponent } from './progress-notes-fp-form.component';

describe('ProgressNotesFpFormComponent', () => {
  let component: ProgressNotesFpFormComponent;
  let fixture: ComponentFixture<ProgressNotesFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressNotesFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressNotesFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
