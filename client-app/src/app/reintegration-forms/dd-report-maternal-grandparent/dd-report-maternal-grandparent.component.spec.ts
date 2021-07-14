import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdReportMaternalGrandparentComponent } from './dd-report-maternal-grandparent.component';

describe('DdReportMaternalGrandparentComponent', () => {
  let component: DdReportMaternalGrandparentComponent;
  let fixture: ComponentFixture<DdReportMaternalGrandparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdReportMaternalGrandparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdReportMaternalGrandparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
