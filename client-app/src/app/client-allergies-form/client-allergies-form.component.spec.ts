import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAllergiesFormComponent } from './client-allergies-form.component';

describe('ClientAllergiesFormComponent', () => {
  let component: ClientAllergiesFormComponent;
  let fixture: ComponentFixture<ClientAllergiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAllergiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAllergiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
