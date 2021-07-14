import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeondaryReferralReasonComponent } from './seondary-referral-reason.component';

describe('SeondaryReferralReasonComponent', () => {
  let component: SeondaryReferralReasonComponent;
  let fixture: ComponentFixture<SeondaryReferralReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeondaryReferralReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeondaryReferralReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
