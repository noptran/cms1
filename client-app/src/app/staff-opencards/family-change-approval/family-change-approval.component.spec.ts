import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyChangeApprovalComponent } from './family-change-approval.component';

describe('FamilyChangeApprovalComponent', () => {
  let component: FamilyChangeApprovalComponent;
  let fixture: ComponentFixture<FamilyChangeApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyChangeApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyChangeApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
