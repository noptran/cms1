import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptiveResourceInquiryComponent } from './adoptive-resource-inquiry.component';

describe('AdoptiveResourceInquiryComponent', () => {
  let component: AdoptiveResourceInquiryComponent;
  let fixture: ComponentFixture<AdoptiveResourceInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptiveResourceInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptiveResourceInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
