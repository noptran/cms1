import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhhsStaffComponent } from './dhhs-staff.component';

describe('DhhsStaffComponent', () => {
  let component: DhhsStaffComponent;
  let fixture: ComponentFixture<DhhsStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhhsStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhhsStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
