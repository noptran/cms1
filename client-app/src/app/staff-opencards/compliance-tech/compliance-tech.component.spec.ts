import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceTechComponent } from './compliance-tech.component';

describe('ComplianceTechComponent', () => {
  let component: ComplianceTechComponent;
  let fixture: ComponentFixture<ComplianceTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
