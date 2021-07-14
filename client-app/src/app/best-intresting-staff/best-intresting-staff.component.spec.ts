import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestIntrestingStaffComponent } from './best-intresting-staff.component';

describe('BestIntrestingStaffComponent', () => {
  let component: BestIntrestingStaffComponent;
  let fixture: ComponentFixture<BestIntrestingStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestIntrestingStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestIntrestingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
