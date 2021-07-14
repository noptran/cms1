import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingRecruitmentComponent } from './licensing-recruitment.component';

describe('LicensingRecruitmentComponent', () => {
  let component: LicensingRecruitmentComponent;
  let fixture: ComponentFixture<LicensingRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensingRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensingRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
