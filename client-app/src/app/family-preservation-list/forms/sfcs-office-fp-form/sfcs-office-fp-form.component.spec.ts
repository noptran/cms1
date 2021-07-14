import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcsOfficeFpFormComponent } from './sfcs-office-fp-form.component';

describe('SfcsOfficeFpFormComponent', () => {
  let component: SfcsOfficeFpFormComponent;
  let fixture: ComponentFixture<SfcsOfficeFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcsOfficeFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcsOfficeFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
