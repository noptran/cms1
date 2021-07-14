import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationOfCriminalOffensesComponent } from './declaration-of-criminal-offenses.component';

describe('DeclarationOfCriminalOffensesComponent', () => {
  let component: DeclarationOfCriminalOffensesComponent;
  let fixture: ComponentFixture<DeclarationOfCriminalOffensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationOfCriminalOffensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationOfCriminalOffensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
