import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForConsentToAdoptComponent } from './request-for-consent-to-adopt.component';

describe('RequestForConsentToAdoptComponent', () => {
  let component: RequestForConsentToAdoptComponent;
  let fixture: ComponentFixture<RequestForConsentToAdoptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForConsentToAdoptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForConsentToAdoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
