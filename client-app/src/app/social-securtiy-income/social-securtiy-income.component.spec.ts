import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSecurtiyIncomeComponent } from './social-securtiy-income.component';

describe('SocialSecurtiyIncomeComponent', () => {
  let component: SocialSecurtiyIncomeComponent;
  let fixture: ComponentFixture<SocialSecurtiyIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialSecurtiyIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSecurtiyIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
