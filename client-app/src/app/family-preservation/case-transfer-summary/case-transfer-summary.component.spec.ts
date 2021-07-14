import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTransferSummaryComponent } from './case-transfer-summary.component';

describe('CaseTransferSummaryComponent', () => {
  let component: CaseTransferSummaryComponent;
  let fixture: ComponentFixture<CaseTransferSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTransferSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTransferSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
