import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfmOfficeComponent } from './sfm-office.component';

describe('SfmOfficeComponent', () => {
  let component: SfmOfficeComponent;
  let fixture: ComponentFixture<SfmOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfmOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfmOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
