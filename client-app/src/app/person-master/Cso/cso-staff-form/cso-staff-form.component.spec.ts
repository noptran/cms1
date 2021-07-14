import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoStaffFormComponent } from './cso-staff-form.component';

describe('CsoStaffFormComponent', () => {
  let component: CsoStaffFormComponent;
  let fixture: ComponentFixture<CsoStaffFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoStaffFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
