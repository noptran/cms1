import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdReportMotherComponent } from './dd-report-mother.component';

describe('DdReportMotherComponent', () => {
  let component: DdReportMotherComponent;
  let fixture: ComponentFixture<DdReportMotherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdReportMotherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdReportMotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
