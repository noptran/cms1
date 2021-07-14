import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq6MoComponent } from './asq-6-mo.component';

describe('Asq6MoComponent', () => {
  let component: Asq6MoComponent;
  let fixture: ComponentFixture<Asq6MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq6MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq6MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
