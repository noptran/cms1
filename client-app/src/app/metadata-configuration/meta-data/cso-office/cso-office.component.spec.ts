import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoOfficeComponent } from './cso-office.component';

describe('CsoOfficeComponent', () => {
  let component: CsoOfficeComponent;
  let fixture: ComponentFixture<CsoOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
