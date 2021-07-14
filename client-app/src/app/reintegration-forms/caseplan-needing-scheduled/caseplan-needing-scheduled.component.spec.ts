import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseplanNeedingScheduledComponent } from './caseplan-needing-scheduled.component';

describe('CaseplanNeedingScheduledComponent', () => {
  let component: CaseplanNeedingScheduledComponent;
  let fixture: ComponentFixture<CaseplanNeedingScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseplanNeedingScheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseplanNeedingScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
