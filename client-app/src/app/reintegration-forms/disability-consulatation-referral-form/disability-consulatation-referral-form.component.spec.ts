import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilityConsulatationReferralFormComponent } from './disability-consulatation-referral-form.component';

describe('DisabilityConsulatationReferralFormComponent', () => {
  let component: DisabilityConsulatationReferralFormComponent;
  let fixture: ComponentFixture<DisabilityConsulatationReferralFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilityConsulatationReferralFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityConsulatationReferralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
