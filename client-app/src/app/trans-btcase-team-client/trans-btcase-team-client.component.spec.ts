import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransBTcaseTeamClientComponent } from './trans-btcase-team-client.component';

describe('TransBTcaseTeamClientComponent', () => {
  let component: TransBTcaseTeamClientComponent;
  let fixture: ComponentFixture<TransBTcaseTeamClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransBTcaseTeamClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransBTcaseTeamClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
