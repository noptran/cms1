import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTeamListComponent } from './case-team-list.component';

describe('CaseTeamListComponent', () => {
  let component: CaseTeamListComponent;
  let fixture: ComponentFixture<CaseTeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTeamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
