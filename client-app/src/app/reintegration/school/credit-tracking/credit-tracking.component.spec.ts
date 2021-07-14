import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditTrackingComponent } from './credit-tracking.component';

describe('CreditTrackingComponent', () => {
  let component: CreditTrackingComponent;
  let fixture: ComponentFixture<CreditTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
