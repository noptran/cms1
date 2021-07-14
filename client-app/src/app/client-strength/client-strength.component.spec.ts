import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStrengthComponent } from './client-strength.component';

describe('ClientStrengthComponent', () => {
  let component: ClientStrengthComponent;
  let fixture: ComponentFixture<ClientStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
