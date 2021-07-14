import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildMoveDisruptionComponent } from './child-move-disruption.component';

describe('ChildMoveDisruptionComponent', () => {
  let component: ChildMoveDisruptionComponent;
  let fixture: ComponentFixture<ChildMoveDisruptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildMoveDisruptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildMoveDisruptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
