import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTherpyFaceToFaceContactComponent } from './non-therpy-face-to-face-contact.component';

describe('NonTherpyFaceToFaceContactComponent', () => {
  let component: NonTherpyFaceToFaceContactComponent;
  let fixture: ComponentFixture<NonTherpyFaceToFaceContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonTherpyFaceToFaceContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTherpyFaceToFaceContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
