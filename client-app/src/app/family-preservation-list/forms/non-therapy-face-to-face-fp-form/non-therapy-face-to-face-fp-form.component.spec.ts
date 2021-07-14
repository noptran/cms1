import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTherapyFaceToFaceFpFormComponent } from './non-therapy-face-to-face-fp-form.component';

describe('NonTherapyFaceToFaceFpFormComponent', () => {
  let component: NonTherapyFaceToFaceFpFormComponent;
  let fixture: ComponentFixture<NonTherapyFaceToFaceFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonTherapyFaceToFaceFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTherapyFaceToFaceFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
