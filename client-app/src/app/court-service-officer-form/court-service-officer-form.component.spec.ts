import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtServiceOfficerFormComponent } from './court-service-officer-form.component';

describe('CourtServiceOfficerFormComponent', () => {
  let component: CourtServiceOfficerFormComponent;
  let fixture: ComponentFixture<CourtServiceOfficerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtServiceOfficerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtServiceOfficerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
