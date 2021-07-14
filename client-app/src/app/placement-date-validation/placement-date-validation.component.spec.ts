import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementDateValidationComponent } from './placement-date-validation.component';

describe('PlacementDateValidationComponent', () => {
  let component: PlacementDateValidationComponent;
  let fixture: ComponentFixture<PlacementDateValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementDateValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementDateValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
