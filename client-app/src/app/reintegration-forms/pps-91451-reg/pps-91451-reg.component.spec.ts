import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pps91451RegComponent } from './pps-91451-reg.component';

describe('Pps91451RegComponent', () => {
  let component: Pps91451RegComponent;
  let fixture: ComponentFixture<Pps91451RegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pps91451RegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pps91451RegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
