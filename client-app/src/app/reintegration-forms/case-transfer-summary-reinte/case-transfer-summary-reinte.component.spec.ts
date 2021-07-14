import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTransferSummaryReinteComponent } from './case-transfer-summary-reinte.component';

describe('CaseTransferSummaryReinteComponent', () => {
  let component: CaseTransferSummaryReinteComponent;
  let fixture: ComponentFixture<CaseTransferSummaryReinteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTransferSummaryReinteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTransferSummaryReinteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
