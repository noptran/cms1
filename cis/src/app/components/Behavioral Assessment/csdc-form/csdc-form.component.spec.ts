import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsdcFormComponent } from './csdc-form.component';

describe('CsdcFormComponent', () => {
  let component: CsdcFormComponent;
  let fixture: ComponentFixture<CsdcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsdcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsdcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
