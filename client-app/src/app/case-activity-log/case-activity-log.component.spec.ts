import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActivityLogComponent } from './case-activity-log.component';

describe('CaseActivityLogComponent', () => {
  let component: CaseActivityLogComponent;
  let fixture: ComponentFixture<CaseActivityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
