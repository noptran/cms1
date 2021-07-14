import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitationScheduleComponent } from './visitation-schedule.component';

describe('VisitationScheduleComponent', () => {
  let component: VisitationScheduleComponent;
  let fixture: ComponentFixture<VisitationScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitationScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
