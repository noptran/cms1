import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DHSStaffComponent } from './dhs-staff.component';

describe('DCHStaffComponent', () => {
  let component: DHSStaffComponent;
  let fixture: ComponentFixture<DHSStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DHSStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DHSStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
