import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq12MoComponent } from './asq-12-mo.component';

describe('Asq12MoComponent', () => {
  let component: Asq12MoComponent;
  let fixture: ComponentFixture<Asq12MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq12MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq12MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
