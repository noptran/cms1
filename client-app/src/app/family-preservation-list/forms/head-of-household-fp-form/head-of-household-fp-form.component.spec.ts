import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOfHouseholdFpFormComponent } from './head-of-household-fp-form.component';

describe('HeadOfHouseholdFpFormComponent', () => {
  let component: HeadOfHouseholdFpFormComponent;
  let fixture: ComponentFixture<HeadOfHouseholdFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadOfHouseholdFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadOfHouseholdFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
