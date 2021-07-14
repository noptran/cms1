import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailsFormComponent } from './team-details-form.component';

describe('TeamDetailsFormComponent', () => {
  let component: TeamDetailsFormComponent;
  let fixture: ComponentFixture<TeamDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
