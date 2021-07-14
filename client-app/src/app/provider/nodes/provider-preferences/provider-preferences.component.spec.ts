import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPreferencesComponent } from './provider-preferences.component';

describe('ProviderPreferencesComponent', () => {
  let component: ProviderPreferencesComponent;
  let fixture: ComponentFixture<ProviderPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
