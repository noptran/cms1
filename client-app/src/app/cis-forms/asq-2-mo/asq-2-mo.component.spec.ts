import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq2MoComponent } from './asq-2-mo.component';

describe('Asq2MoComponent', () => {
  let component: Asq2MoComponent;
  let fixture: ComponentFixture<Asq2MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq2MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq2MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
