import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaOfficerFormComponent } from './casa-officer-form.component';

describe('CasaOfficerFormComponent', () => {
  let component: CasaOfficerFormComponent;
  let fixture: ComponentFixture<CasaOfficerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasaOfficerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasaOfficerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
