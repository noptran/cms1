import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asq60MoComponent } from './asq-60-mo.component';

describe('Asq60MoComponent', () => {
  let component: Asq60MoComponent;
  let fixture: ComponentFixture<Asq60MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asq60MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asq60MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
