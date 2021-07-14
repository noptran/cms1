import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtCaseComponent } from './court-case.component';

describe('CourtCaseComponent', () => {
  let component: CourtCaseComponent;
  let fixture: ComponentFixture<CourtCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
