import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIncidentComponent } from './client-incident.component';

describe('ClientIncidentComponent', () => {
  let component: ClientIncidentComponent;
  let fixture: ComponentFixture<ClientIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
