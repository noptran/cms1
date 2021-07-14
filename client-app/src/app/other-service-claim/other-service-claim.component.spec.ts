import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherServiceClaimComponent } from './other-service-claim.component';

describe('OtherServiceClaimComponent', () => {
  let component: OtherServiceClaimComponent;
  let fixture: ComponentFixture<OtherServiceClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherServiceClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherServiceClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
