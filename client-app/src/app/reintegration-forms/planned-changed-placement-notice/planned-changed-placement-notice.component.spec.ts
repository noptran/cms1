import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedChangedPlacementNoticeComponent } from './planned-changed-placement-notice.component';

describe('PlannedChangedPlacementNoticeComponent', () => {
  let component: PlannedChangedPlacementNoticeComponent;
  let fixture: ComponentFixture<PlannedChangedPlacementNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedChangedPlacementNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedChangedPlacementNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
