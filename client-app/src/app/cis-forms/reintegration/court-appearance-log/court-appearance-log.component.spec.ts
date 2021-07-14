import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtAppearanceLogComponent } from './court-appearance-log.component';

describe('CourtAppearanceLogComponent', () => {
  let component: CourtAppearanceLogComponent;
  let fixture: ComponentFixture<CourtAppearanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtAppearanceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtAppearanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
