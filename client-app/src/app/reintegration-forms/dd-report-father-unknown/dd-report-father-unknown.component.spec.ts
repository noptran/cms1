import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdReportFatherUnknownComponent } from './dd-report-father-unknown.component';

describe('DdReportFatherUnknownComponent', () => {
  let component: DdReportFatherUnknownComponent;
  let fixture: ComponentFixture<DdReportFatherUnknownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdReportFatherUnknownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdReportFatherUnknownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
