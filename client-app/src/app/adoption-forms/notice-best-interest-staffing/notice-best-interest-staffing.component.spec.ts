import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBestInterestStaffingComponent } from './notice-best-interest-staffing.component';

describe('NoticeBestInterestStaffingComponent', () => {
  let component: NoticeBestInterestStaffingComponent;
  let fixture: ComponentFixture<NoticeBestInterestStaffingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeBestInterestStaffingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBestInterestStaffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
