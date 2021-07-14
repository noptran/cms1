import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq24MoComponent } from './asq-24-mo.component';

describe('Asq24MoComponent', () => {
  let component: Asq24MoComponent;
  let fixture: ComponentFixture<Asq24MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq24MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq24MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
