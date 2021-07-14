import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionAfterCareSummaryComponent } from './adoption-after-care-summary.component';

describe('AdoptionAfterCareSummaryComponent', () => {
  let component: AdoptionAfterCareSummaryComponent;
  let fixture: ComponentFixture<AdoptionAfterCareSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionAfterCareSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionAfterCareSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
