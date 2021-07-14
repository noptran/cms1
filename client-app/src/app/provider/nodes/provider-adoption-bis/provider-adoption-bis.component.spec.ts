import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAdoptionBISComponent } from './provider-adoption-bis.component';

describe('ProviderAdoptionBISComponent', () => {
  let component: ProviderAdoptionBISComponent;
  let fixture: ComponentFixture<ProviderAdoptionBISComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderAdoptionBISComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAdoptionBISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
