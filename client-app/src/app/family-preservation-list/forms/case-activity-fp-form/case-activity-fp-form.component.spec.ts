import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActivityFpFormComponent } from './case-activity-fp-form.component';

describe('CaseActivityFpFormComponent', () => {
  let component: CaseActivityFpFormComponent;
  let fixture: ComponentFixture<CaseActivityFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseActivityFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseActivityFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
