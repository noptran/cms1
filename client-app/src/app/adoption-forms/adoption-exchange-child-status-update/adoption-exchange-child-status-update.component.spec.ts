import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionExchangeChildStatusUpdateComponent } from './adoption-exchange-child-status-update.component';

describe('AdoptionExchangeChildStatusUpdateComponent', () => {
  let component: AdoptionExchangeChildStatusUpdateComponent;
  let fixture: ComponentFixture<AdoptionExchangeChildStatusUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionExchangeChildStatusUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionExchangeChildStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
