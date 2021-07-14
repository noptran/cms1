import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAllergiesComponent } from './client-allergies.component';

describe('ClientAllergiesComponent', () => {
  let component: ClientAllergiesComponent;
  let fixture: ComponentFixture<ClientAllergiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAllergiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
