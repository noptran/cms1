import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq48MoComponent } from './asq-48-mo.component';

describe('Asq48MoComponent', () => {
  let component: Asq48MoComponent;
  let fixture: ComponentFixture<Asq48MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq48MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq48MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
