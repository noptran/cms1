import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsClientProfileComponent } from './cs-client-profile.component';

describe('CsClientProfileComponent', () => {
  let component: CsClientProfileComponent;
  let fixture: ComponentFixture<CsClientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsClientProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
