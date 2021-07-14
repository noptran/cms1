import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdReportAllegedFatherComponent } from './dd-report-alleged-father.component';

describe('DdReportAllegedFatherComponent', () => {
  let component: DdReportAllegedFatherComponent;
  let fixture: ComponentFixture<DdReportAllegedFatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdReportAllegedFatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdReportAllegedFatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
