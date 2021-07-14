import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyLiabilityFormComponent } from './third-party-liability-form.component';

describe('ThirdPartyLiabilityFormComponent', () => {
  let component: ThirdPartyLiabilityFormComponent;
  let fixture: ComponentFixture<ThirdPartyLiabilityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartyLiabilityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyLiabilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
