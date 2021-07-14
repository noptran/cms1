import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq30MoComponent } from './asq-30-mo.component';

describe('Asq30MoComponent', () => {
  let component: Asq30MoComponent;
  let fixture: ComponentFixture<Asq30MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq30MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq30MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
