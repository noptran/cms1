import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTeamFpFormComponent } from './case-team-fp-form.component';

describe('CaseTeamFpFormComponent', () => {
  let component: CaseTeamFpFormComponent;
  let fixture: ComponentFixture<CaseTeamFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTeamFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTeamFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
