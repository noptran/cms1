import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseExceptionComponent } from './license-exception.component';

describe('LicenseExceptionComponent', () => {
  let component: LicenseExceptionComponent;
  let fixture: ComponentFixture<LicenseExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
