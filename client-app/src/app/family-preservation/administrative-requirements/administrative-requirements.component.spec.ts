import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeRequirementsComponent } from './administrative-requirements.component';

describe('AdministrativeRequirementsComponent', () => {
  let component: AdministrativeRequirementsComponent;
  let fixture: ComponentFixture<AdministrativeRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
