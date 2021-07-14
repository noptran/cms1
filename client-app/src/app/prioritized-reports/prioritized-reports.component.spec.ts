import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritizedReportsComponent } from './prioritized-reports.component';

describe('PrioritizedReportsComponent', () => {
  let component: PrioritizedReportsComponent;
  let fixture: ComponentFixture<PrioritizedReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritizedReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritizedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
