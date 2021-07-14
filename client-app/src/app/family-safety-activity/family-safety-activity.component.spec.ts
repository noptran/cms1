import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySafetyActivityComponent } from './family-safety-activity.component';

describe('FamilySafetyActivityComponent', () => {
  let component: FamilySafetyActivityComponent;
  let fixture: ComponentFixture<FamilySafetyActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySafetyActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySafetyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
