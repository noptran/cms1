import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActivityComponent } from './case-activity.component';

describe('CaseActivityComponent', () => {
  let component: CaseActivityComponent;
  let fixture: ComponentFixture<CaseActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
