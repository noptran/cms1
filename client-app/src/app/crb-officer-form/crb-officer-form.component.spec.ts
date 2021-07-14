import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrbOfficerFormComponent } from './crb-officer-form.component';

describe('CrbOfficerFormComponent', () => {
  let component: CrbOfficerFormComponent;
  let fixture: ComponentFixture<CrbOfficerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrbOfficerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrbOfficerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
