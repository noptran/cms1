import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtServiceOfficerComponent } from './court-service-officer.component';

describe('CourtServiceOfficerComponent', () => {
  let component: CourtServiceOfficerComponent;
  let fixture: ComponentFixture<CourtServiceOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtServiceOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtServiceOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
