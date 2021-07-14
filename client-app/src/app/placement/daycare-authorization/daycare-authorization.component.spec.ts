import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaycareAuthorizationComponent } from './daycare-authorization.component';

describe('DaycareAuthorizationComponent', () => {
  let component: DaycareAuthorizationComponent;
  let fixture: ComponentFixture<DaycareAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaycareAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaycareAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
