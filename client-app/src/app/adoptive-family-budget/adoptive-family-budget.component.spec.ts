import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptiveFamilyBudgetComponent } from './adoptive-family-budget.component';

describe('AdoptiveFamilyBudgetComponent', () => {
  let component: AdoptiveFamilyBudgetComponent;
  let fixture: ComponentFixture<AdoptiveFamilyBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptiveFamilyBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptiveFamilyBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
