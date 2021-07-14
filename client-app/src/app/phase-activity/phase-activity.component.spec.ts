import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseActivityComponent } from './phase-activity.component';

describe('PhaseActivityComponent', () => {
  let component: PhaseActivityComponent;
  let fixture: ComponentFixture<PhaseActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
