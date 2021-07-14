import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrdOfficerComponent } from './crd-officer.component';

describe('CrdOfficerComponent', () => {
  let component: CrdOfficerComponent;
  let fixture: ComponentFixture<CrdOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrdOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrdOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
