import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerParentQualityChecklistComponent } from './worker-parent-quality-checklist.component';

describe('WorkerParentQualityChecklistComponent', () => {
  let component: WorkerParentQualityChecklistComponent;
  let fixture: ComponentFixture<WorkerParentQualityChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerParentQualityChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerParentQualityChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
