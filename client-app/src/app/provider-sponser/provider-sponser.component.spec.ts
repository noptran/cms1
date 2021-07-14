import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSponserComponent } from './provider-sponser.component';

describe('ProviderSponserComponent', () => {
  let component: ProviderSponserComponent;
  let fixture: ComponentFixture<ProviderSponserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSponserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSponserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
