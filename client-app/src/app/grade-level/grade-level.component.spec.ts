import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeLevelComponent } from './grade-level.component';

describe('GradeLevelComponent', () => {
  let component: GradeLevelComponent;
  let fixture: ComponentFixture<GradeLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
