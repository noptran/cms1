import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcsEmployeeResourceComponent } from './sfcs-employee-resource.component';

describe('SfcsEmployeeResourceComponent', () => {
  let component: SfcsEmployeeResourceComponent;
  let fixture: ComponentFixture<SfcsEmployeeResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcsEmployeeResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcsEmployeeResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
