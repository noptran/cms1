import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFinancialFormComponent } from './request-financial-form.component';

describe('RequestFinancialFormComponent', () => {
  let component: RequestFinancialFormComponent;
  let fixture: ComponentFixture<RequestFinancialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFinancialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFinancialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
