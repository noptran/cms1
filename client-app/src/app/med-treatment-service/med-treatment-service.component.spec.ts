import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedTreatmentServiceComponent } from './med-treatment-service.component';

describe('MedTreatmentServiceComponent', () => {
  let component: MedTreatmentServiceComponent;
  let fixture: ComponentFixture<MedTreatmentServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedTreatmentServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedTreatmentServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
