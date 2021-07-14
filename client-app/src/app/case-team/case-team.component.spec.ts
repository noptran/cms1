import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTeamComponent } from './case-team.component';

describe('CaseTeamComponent', () => {
  let component: CaseTeamComponent;
  let fixture: ComponentFixture<CaseTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
