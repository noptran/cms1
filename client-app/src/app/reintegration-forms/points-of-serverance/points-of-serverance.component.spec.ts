import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOfServeranceComponent } from './points-of-serverance.component';

describe('PointsOfServeranceComponent', () => {
  let component: PointsOfServeranceComponent;
  let fixture: ComponentFixture<PointsOfServeranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsOfServeranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsOfServeranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
