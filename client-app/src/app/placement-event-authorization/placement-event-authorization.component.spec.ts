import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementEventAuthorizationComponent } from './placement-event-authorization.component';

describe('PlacementEventAuthorizationComponent', () => {
  let component: PlacementEventAuthorizationComponent;
  let fixture: ComponentFixture<PlacementEventAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementEventAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementEventAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
