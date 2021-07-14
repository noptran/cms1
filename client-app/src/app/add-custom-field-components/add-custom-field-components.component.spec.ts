import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomFieldComponentsComponent } from './add-custom-field-components.component';

describe('AddCustomFieldComponentsComponent', () => {
  let component: AddCustomFieldComponentsComponent;
  let fixture: ComponentFixture<AddCustomFieldComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomFieldComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomFieldComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
