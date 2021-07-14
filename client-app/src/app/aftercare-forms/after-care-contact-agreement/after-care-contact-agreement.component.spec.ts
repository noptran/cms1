import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterCareContactAgreementComponent } from './after-care-contact-agreement.component';

describe('AfterCareContactAgreementComponent', () => {
  let component: AfterCareContactAgreementComponent;
  let fixture: ComponentFixture<AfterCareContactAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterCareContactAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterCareContactAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
