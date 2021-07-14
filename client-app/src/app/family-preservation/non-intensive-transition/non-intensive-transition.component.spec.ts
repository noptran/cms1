import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonIntensiveTransitionComponent } from './non-intensive-transition.component';

describe('NonIntensiveTransitionComponent', () => {
  let component: NonIntensiveTransitionComponent;
  let fixture: ComponentFixture<NonIntensiveTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonIntensiveTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonIntensiveTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
