import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPreservationProgressNoteComponent } from './family-preservation-progress-note.component';

describe('FamilyPreservationProgressNoteComponent', () => {
  let component: FamilyPreservationProgressNoteComponent;
  let fixture: ComponentFixture<FamilyPreservationProgressNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyPreservationProgressNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPreservationProgressNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
