import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtReportTemplateComponent } from './court-report-template.component';

describe('CourtReportTemplateComponent', () => {
  let component: CourtReportTemplateComponent;
  let fixture: ComponentFixture<CourtReportTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtReportTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
