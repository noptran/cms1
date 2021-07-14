import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanencyPlanChecklistComponent } from './permanency-plan-checklist.component';

describe('PermanencyPlanChecklistComponent', () => {
  let component: PermanencyPlanChecklistComponent;
  let fixture: ComponentFixture<PermanencyPlanChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanencyPlanChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanencyPlanChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
