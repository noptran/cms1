import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyLiabilityListComponent } from './third-party-liability-list.component';

describe('ThirdPartyLiabilityListComponent', () => {
  let component: ThirdPartyLiabilityListComponent;
  let fixture: ComponentFixture<ThirdPartyLiabilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartyLiabilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyLiabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
