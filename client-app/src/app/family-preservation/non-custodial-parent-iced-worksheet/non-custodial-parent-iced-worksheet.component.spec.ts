import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCustodialParentIcedWorksheetComponent } from './non-custodial-parent-iced-worksheet.component';

describe('NonCustodialParentIcedWorksheetComponent', () => {
  let component: NonCustodialParentIcedWorksheetComponent;
  let fixture: ComponentFixture<NonCustodialParentIcedWorksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonCustodialParentIcedWorksheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonCustodialParentIcedWorksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
