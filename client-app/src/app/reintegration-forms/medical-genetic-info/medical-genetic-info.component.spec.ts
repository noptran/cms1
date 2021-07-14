import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalGeneticInfoComponent } from './medical-genetic-info.component';

describe('MedicalGeneticInfoComponent', () => {
  let component: MedicalGeneticInfoComponent;
  let fixture: ComponentFixture<MedicalGeneticInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalGeneticInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalGeneticInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
