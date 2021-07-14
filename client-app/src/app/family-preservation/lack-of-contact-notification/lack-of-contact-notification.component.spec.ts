import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LackOfContactNotificationComponent } from './lack-of-contact-notification.component';

describe('LackOfContactNotificationComponent', () => {
  let component: LackOfContactNotificationComponent;
  let fixture: ComponentFixture<LackOfContactNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LackOfContactNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LackOfContactNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
