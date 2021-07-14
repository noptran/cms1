import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationAllergiesComponent } from './medication-allergies.component';

describe('MedicationAllergiesComponent', () => {
  let component: MedicationAllergiesComponent;
  let fixture: ComponentFixture<MedicationAllergiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationAllergiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
