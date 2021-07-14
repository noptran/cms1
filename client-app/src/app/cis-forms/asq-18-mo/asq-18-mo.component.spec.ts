import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq18MoComponent } from './asq-18-mo.component';

describe('Asq18MoComponent', () => {
  let component: Asq18MoComponent;
  let fixture: ComponentFixture<Asq18MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq18MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq18MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
