import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcsOfficerComponent } from './sfcs-officer.component';

describe('SfcsOfficerComponent', () => {
  let component: SfcsOfficerComponent;
  let fixture: ComponentFixture<SfcsOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcsOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcsOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
