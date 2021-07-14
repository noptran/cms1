import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedClaimsComponent } from './approved-claims.component';

describe('ApprovedClaimsComponent', () => {
  let component: ApprovedClaimsComponent;
  let fixture: ComponentFixture<ApprovedClaimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedClaimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
