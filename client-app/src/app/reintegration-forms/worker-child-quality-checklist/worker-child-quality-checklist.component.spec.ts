import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerChildQualityChecklistComponent } from './worker-child-quality-checklist.component';

describe('WorkerChildQualityChecklistComponent', () => {
  let component: WorkerChildQualityChecklistComponent;
  let fixture: ComponentFixture<WorkerChildQualityChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerChildQualityChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerChildQualityChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
