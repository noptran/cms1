import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffFormListComponent } from './staff-form-list.component';

describe('StaffFormListComponent', () => {
  let component: StaffFormListComponent;
  let fixture: ComponentFixture<StaffFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
