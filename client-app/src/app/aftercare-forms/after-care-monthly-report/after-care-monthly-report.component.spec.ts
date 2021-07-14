import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterCareMonthlyReportComponent } from './after-care-monthly-report.component';

describe('AfterCareMonthlyReportComponent', () => {
  let component: AfterCareMonthlyReportComponent;
  let fixture: ComponentFixture<AfterCareMonthlyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterCareMonthlyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterCareMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
