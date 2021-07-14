import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAndFamilyProfileComponent } from './child-and-family-profile.component';

describe('ChildAndFamilyProfileComponent', () => {
  let component: ChildAndFamilyProfileComponent;
  let fixture: ComponentFixture<ChildAndFamilyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAndFamilyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAndFamilyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
