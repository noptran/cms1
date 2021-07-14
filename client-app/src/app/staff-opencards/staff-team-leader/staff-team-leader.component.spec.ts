import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTeamLeaderComponent } from './staff-team-leader.component';

describe('StaffTeamLeaderComponent', () => {
  let component: StaffTeamLeaderComponent;
  let fixture: ComponentFixture<StaffTeamLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffTeamLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffTeamLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
