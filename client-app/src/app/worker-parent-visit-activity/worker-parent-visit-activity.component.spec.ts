import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerParentVisitActivityComponent } from './worker-parent-visit-activity.component';

describe('WorkerParentVisitActivityComponent', () => {
  let component: WorkerParentVisitActivityComponent;
  let fixture: ComponentFixture<WorkerParentVisitActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerParentVisitActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerParentVisitActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
