import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhsOfficeComponent } from './dhs-office.component';

describe('DhsOfficeComponent', () => {
  let component: DhsOfficeComponent;
  let fixture: ComponentFixture<DhsOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhsOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhsOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
