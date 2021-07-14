import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtAppearanceVersioningComponent } from './court-appearance-versioning.component';

describe('CourtAppearanceVersioningComponent', () => {
  let component: CourtAppearanceVersioningComponent;
  let fixture: ComponentFixture<CourtAppearanceVersioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtAppearanceVersioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtAppearanceVersioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
