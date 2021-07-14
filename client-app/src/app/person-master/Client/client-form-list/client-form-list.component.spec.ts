import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormListComponent } from './client-form-list.component';

describe('ClientFormListComponent', () => {
  let component: ClientFormListComponent;
  let fixture: ComponentFixture<ClientFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
