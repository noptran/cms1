import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseFpFormComponent } from './phase-fp-form.component';

describe('PhaseFpFormComponent', () => {
  let component: PhaseFpFormComponent;
  let fixture: ComponentFixture<PhaseFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
