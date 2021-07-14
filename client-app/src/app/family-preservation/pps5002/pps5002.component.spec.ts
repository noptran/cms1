import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pps5002Component } from './pps5002.component';

describe('Pps5002Component', () => {
  let component: Pps5002Component;
  let fixture: ComponentFixture<Pps5002Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pps5002Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pps5002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
