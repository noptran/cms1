import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseActivityListComponent } from './phase-activity-list.component';

describe('PhaseActivityListComponent', () => {
  let component: PhaseActivityListComponent;
  let fixture: ComponentFixture<PhaseActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
