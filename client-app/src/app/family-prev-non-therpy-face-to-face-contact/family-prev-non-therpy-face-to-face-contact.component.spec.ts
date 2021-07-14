import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPrevNonTherpyFaceToFaceContactComponent } from './family-prev-non-therpy-face-to-face-contact.component';

describe('FamilyPrevNonTherpyFaceToFaceContactComponent', () => {
  let component: FamilyPrevNonTherpyFaceToFaceContactComponent;
  let fixture: ComponentFixture<FamilyPrevNonTherpyFaceToFaceContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyPrevNonTherpyFaceToFaceContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPrevNonTherpyFaceToFaceContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
