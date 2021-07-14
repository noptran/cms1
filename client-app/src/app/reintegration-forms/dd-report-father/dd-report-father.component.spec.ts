import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdReportFatherComponent } from './dd-report-father.component';

describe('DdReportFatherComponent', () => {
  let component: DdReportFatherComponent;
  let fixture: ComponentFixture<DdReportFatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdReportFatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdReportFatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
