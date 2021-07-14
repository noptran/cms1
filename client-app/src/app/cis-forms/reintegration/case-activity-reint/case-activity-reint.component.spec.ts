import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActivityReintComponent } from './case-activity-reint.component';

describe('CaseActivityReintComponent', () => {
  let component: CaseActivityReintComponent;
  let fixture: ComponentFixture<CaseActivityReintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseActivityReintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseActivityReintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
