import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActivityListComponent } from './case-activity-list.component';

describe('CaseActivityListComponent', () => {
  let component: CaseActivityListComponent;
  let fixture: ComponentFixture<CaseActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
