import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressNoteDiagnosisFpFormComponent } from './progress-note-diagnosis-fp-form.component';

describe('ProgressNoteDiagnosisFpFormComponent', () => {
  let component: ProgressNoteDiagnosisFpFormComponent;
  let fixture: ComponentFixture<ProgressNoteDiagnosisFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressNoteDiagnosisFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressNoteDiagnosisFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
