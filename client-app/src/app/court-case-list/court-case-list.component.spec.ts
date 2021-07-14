import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtCaseListComponent } from './court-case-list.component';

describe('CourtCaseListComponent', () => {
  let component: CourtCaseListComponent;
  let fixture: ComponentFixture<CourtCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtCaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
