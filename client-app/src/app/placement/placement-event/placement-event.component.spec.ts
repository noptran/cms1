import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementEventComponent } from './placement-event.component';

describe('PlacementEventComponent', () => {
  let component: PlacementEventComponent;
  let fixture: ComponentFixture<PlacementEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
