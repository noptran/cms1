import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckPdfComponent } from './ack-pdf.component';

describe('AckPdfComponent', () => {
  let component: AckPdfComponent;
  let fixture: ComponentFixture<AckPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
