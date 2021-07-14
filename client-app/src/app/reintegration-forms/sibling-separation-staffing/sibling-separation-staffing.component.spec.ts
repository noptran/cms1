import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiblingSeparationStaffingComponent } from './sibling-separation-staffing.component';

describe('SiblingSeparationStaffingComponent', () => {
  let component: SiblingSeparationStaffingComponent;
  let fixture: ComponentFixture<SiblingSeparationStaffingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiblingSeparationStaffingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiblingSeparationStaffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
