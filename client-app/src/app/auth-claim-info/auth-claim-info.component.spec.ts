import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClaimInfoComponent } from './auth-claim-info.component';

describe('AuthClaimInfoComponent', () => {
  let component: AuthClaimInfoComponent;
  let fixture: ComponentFixture<AuthClaimInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthClaimInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthClaimInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
