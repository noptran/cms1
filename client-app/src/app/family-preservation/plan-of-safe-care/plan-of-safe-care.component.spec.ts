import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOfSafeCareComponent } from './plan-of-safe-care.component';

describe('PlanOfSafeCareComponent', () => {
  let component: PlanOfSafeCareComponent;
  let fixture: ComponentFixture<PlanOfSafeCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanOfSafeCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanOfSafeCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
