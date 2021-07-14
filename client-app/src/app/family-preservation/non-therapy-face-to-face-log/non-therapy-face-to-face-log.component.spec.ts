import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTherapyFaceToFaceLogComponent } from './non-therapy-face-to-face-log.component';

describe('NonTherapyFaceToFaceLogComponent', () => {
  let component: NonTherapyFaceToFaceLogComponent;
  let fixture: ComponentFixture<NonTherapyFaceToFaceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonTherapyFaceToFaceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTherapyFaceToFaceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
