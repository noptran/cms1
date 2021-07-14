import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStrengthFormComponent } from './client-strength-form.component';

describe('ClientStrengthFormComponent', () => {
  let component: ClientStrengthFormComponent;
  let fixture: ComponentFixture<ClientStrengthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientStrengthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStrengthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
