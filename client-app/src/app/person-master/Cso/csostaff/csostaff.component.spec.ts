import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsostaffComponent } from './csostaff.component';

describe('CsostaffComponent', () => {
  let component: CsostaffComponent;
  let fixture: ComponentFixture<CsostaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsostaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsostaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
