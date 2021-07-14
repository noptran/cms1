import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtReportComponent } from './court-report.component';

describe('CourtReportComponent', () => {
  let component: CourtReportComponent;
  let fixture: ComponentFixture<CourtReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
