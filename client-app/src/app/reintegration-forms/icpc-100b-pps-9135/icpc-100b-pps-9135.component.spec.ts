import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Icpc100bPps9135Component } from './icpc-100b-pps-9135.component';

describe('Icpc100bPps9135Component', () => {
  let component: Icpc100bPps9135Component;
  let fixture: ComponentFixture<Icpc100bPps9135Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Icpc100bPps9135Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Icpc100bPps9135Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
