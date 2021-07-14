import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReferralChecklistComponent } from './new-referral-checklist.component';

describe('NewReferralChecklistComponent', () => {
  let component: NewReferralChecklistComponent;
  let fixture: ComponentFixture<NewReferralChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReferralChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReferralChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
