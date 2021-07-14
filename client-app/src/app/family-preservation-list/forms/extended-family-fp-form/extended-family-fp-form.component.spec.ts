import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedFamilyFpFormComponent } from './extended-family-fp-form.component';

describe('ExtendedFamilyFpFormComponent', () => {
  let component: ExtendedFamilyFpFormComponent;
  let fixture: ComponentFixture<ExtendedFamilyFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedFamilyFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedFamilyFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
