import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolIEPformComponent } from './school-iepform.component';

describe('SchoolIEPformComponent', () => {
  let component: SchoolIEPformComponent;
  let fixture: ComponentFixture<SchoolIEPformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolIEPformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolIEPformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
