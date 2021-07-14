import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfPlannedMoveWaiverGuideComponent } from './notice-of-planned-move-waiver-guide.component';

describe('NoticeOfPlannedMoveWaiverGuideComponent', () => {
  let component: NoticeOfPlannedMoveWaiverGuideComponent;
  let fixture: ComponentFixture<NoticeOfPlannedMoveWaiverGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeOfPlannedMoveWaiverGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfPlannedMoveWaiverGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
