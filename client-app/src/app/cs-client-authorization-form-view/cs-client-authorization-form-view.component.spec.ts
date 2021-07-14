import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsClientAuthorizationFormViewComponent } from './cs-client-authorization-form-view.component';

describe('CsClientAuthorizationFormViewComponent', () => {
  let component: CsClientAuthorizationFormViewComponent;
  let fixture: ComponentFixture<CsClientAuthorizationFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsClientAuthorizationFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsClientAuthorizationFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
