import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverResponseToolComponent } from './caregiver-response-tool.component';

describe('CaregiverResponseToolComponent', () => {
  let component: CaregiverResponseToolComponent;
  let fixture: ComponentFixture<CaregiverResponseToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverResponseToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverResponseToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
