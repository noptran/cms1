import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationClaimComponent } from './authorization-claim.component';

describe('AuthorizationClaimComponent', () => {
  let component: AuthorizationClaimComponent;
  let fixture: ComponentFixture<AuthorizationClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
