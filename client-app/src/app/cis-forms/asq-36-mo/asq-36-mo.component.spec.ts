import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq36MoComponent } from './asq-36-mo.component';

describe('Asq36MoComponent', () => {
  let component: Asq36MoComponent;
  let fixture: ComponentFixture<Asq36MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq36MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq36MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
