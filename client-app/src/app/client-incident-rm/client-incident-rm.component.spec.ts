import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIncidentRmComponent } from './client-incident-rm.component';

describe('ClientIncidentRmComponent', () => {
  let component: ClientIncidentRmComponent;
  let fixture: ComponentFixture<ClientIncidentRmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientIncidentRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientIncidentRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
