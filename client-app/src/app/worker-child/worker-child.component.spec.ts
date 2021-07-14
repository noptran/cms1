import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerChildComponent } from './worker-child.component';

describe('WorkerChildComponent', () => {
  let component: WorkerChildComponent;
  let fixture: ComponentFixture<WorkerChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
