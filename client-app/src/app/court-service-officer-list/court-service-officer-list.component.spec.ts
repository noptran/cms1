import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtServiceOfficerListComponent } from './court-service-officer-list.component';

describe('CourtServiceOfficerListComponent', () => {
  let component: CourtServiceOfficerListComponent;
  let fixture: ComponentFixture<CourtServiceOfficerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtServiceOfficerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtServiceOfficerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
