import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerChildListComponent } from './worker-child-list.component';

describe('WorkerChildListComponent', () => {
  let component: WorkerChildListComponent;
  let fixture: ComponentFixture<WorkerChildListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerChildListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerChildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
