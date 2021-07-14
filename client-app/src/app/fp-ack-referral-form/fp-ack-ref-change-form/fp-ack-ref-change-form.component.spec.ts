import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpAckRefChangeFormComponent } from './fp-ack-ref-change-form.component';

describe('FpAckRefChangeFormComponent', () => {
  let component: FpAckRefChangeFormComponent;
  let fixture: ComponentFixture<FpAckRefChangeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpAckRefChangeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpAckRefChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
