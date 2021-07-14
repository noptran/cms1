import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitationCourtReportComponent } from './visitation-court-report.component';

describe('VisitationCourtReportComponent', () => {
  let component: VisitationCourtReportComponent;
  let fixture: ComponentFixture<VisitationCourtReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitationCourtReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitationCourtReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
