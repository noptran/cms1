import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralListViewComponent } from './referral-list-view.component';

describe('ReferralListViewComponent', () => {
  let component: ReferralListViewComponent;
  let fixture: ComponentFixture<ReferralListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
