import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFaceToFaceContactFormComponent } from './client-face-to-face-contact-form.component';

describe('ClientFaceToFaceContactFormComponent', () => {
  let component: ClientFaceToFaceContactFormComponent;
  let fixture: ComponentFixture<ClientFaceToFaceContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFaceToFaceContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFaceToFaceContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
