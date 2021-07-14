import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdReportPaternalGrandparentComponent } from './dd-report-paternal-grandparent.component';

describe('DdReportPaternalGrandparentComponent', () => {
  let component: DdReportPaternalGrandparentComponent;
  let fixture: ComponentFixture<DdReportPaternalGrandparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdReportPaternalGrandparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdReportPaternalGrandparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
