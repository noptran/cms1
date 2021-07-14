import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderStrengthComponent } from './provider-strength.component';

describe('ProviderStrengthComponent', () => {
  let component: ProviderStrengthComponent;
  let fixture: ComponentFixture<ProviderStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
