import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectAuthorisationFormViewComponent } from './direct-authorisation-form-view.component';

describe('DirectAuthorisationFormViewComponent', () => {
  let component: DirectAuthorisationFormViewComponent;
  let fixture: ComponentFixture<DirectAuthorisationFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectAuthorisationFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectAuthorisationFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
