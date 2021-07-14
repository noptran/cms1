import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationAllergiesFormComponent } from './medication-allergies-form.component';

describe('MedicationAllergiesFormComponent', () => {
  let component: MedicationAllergiesFormComponent;
  let fixture: ComponentFixture<MedicationAllergiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationAllergiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationAllergiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
