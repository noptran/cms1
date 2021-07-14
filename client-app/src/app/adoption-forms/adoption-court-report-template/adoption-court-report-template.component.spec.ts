import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionCourtReportTemplateComponent } from './adoption-court-report-template.component';

describe('AdoptionCourtReportTemplateComponent', () => {
  let component: AdoptionCourtReportTemplateComponent;
  let fixture: ComponentFixture<AdoptionCourtReportTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionCourtReportTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionCourtReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
