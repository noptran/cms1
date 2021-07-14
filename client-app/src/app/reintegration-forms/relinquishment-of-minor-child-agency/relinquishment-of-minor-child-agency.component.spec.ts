import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelinquishmentOfMinorChildAgencyComponent } from './relinquishment-of-minor-child-agency.component';

describe('RelinquishmentOfMinorChildAgencyComponent', () => {
  let component: RelinquishmentOfMinorChildAgencyComponent;
  let fixture: ComponentFixture<RelinquishmentOfMinorChildAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelinquishmentOfMinorChildAgencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelinquishmentOfMinorChildAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
