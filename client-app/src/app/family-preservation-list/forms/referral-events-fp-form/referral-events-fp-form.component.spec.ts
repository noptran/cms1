import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralEventsFpFormComponent } from './referral-events-fp-form.component';

describe('ReferralEventsFpFormComponent', () => {
  let component: ReferralEventsFpFormComponent;
  let fixture: ComponentFixture<ReferralEventsFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralEventsFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralEventsFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
