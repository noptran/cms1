import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPrimaryFilterComponent } from './report-primary-filter.component';

describe('ReportPrimaryFilterComponent', () => {
  let component: ReportPrimaryFilterComponent;
  let fixture: ComponentFixture<ReportPrimaryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPrimaryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPrimaryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
