import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNotificationTranferComponent } from './staff-notification-tranfer.component';

describe('StaffNotificationTranferComponent', () => {
  let component: StaffNotificationTranferComponent;
  let fixture: ComponentFixture<StaffNotificationTranferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffNotificationTranferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNotificationTranferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
