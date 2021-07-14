import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTherapyFaceToFaceComponent } from './non-therapy-face-to-face.component';

describe('NonTherapyFaceToFaceComponent', () => {
  let component: NonTherapyFaceToFaceComponent;
  let fixture: ComponentFixture<NonTherapyFaceToFaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonTherapyFaceToFaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTherapyFaceToFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
