import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorVersioningComponent } from './behavior-versioning.component';

describe('BehaviorVersioningComponent', () => {
  let component: BehaviorVersioningComponent;
  let fixture: ComponentFixture<BehaviorVersioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BehaviorVersioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviorVersioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
