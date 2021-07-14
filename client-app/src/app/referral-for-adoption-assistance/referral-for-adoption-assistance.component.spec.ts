import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralForAdoptionAssistanceComponent } from './referral-for-adoption-assistance.component';

describe('ReferralForAdoptionAssistanceComponent', () => {
  let component: ReferralForAdoptionAssistanceComponent;
  let fixture: ComponentFixture<ReferralForAdoptionAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralForAdoptionAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralForAdoptionAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
