import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransBtTeamLeadMemberComponent } from './trans-bt-team-lead-member.component';

describe('TransBtTeamLeadMemberComponent', () => {
  let component: TransBtTeamLeadMemberComponent;
  let fixture: ComponentFixture<TransBtTeamLeadMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransBtTeamLeadMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransBtTeamLeadMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
