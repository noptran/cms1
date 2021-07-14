import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAdoptionIRComponent } from './provider-adoption-ir.component';

describe('ProviderAdoptionIRComponent', () => {
  let component: ProviderAdoptionIRComponent;
  let fixture: ComponentFixture<ProviderAdoptionIRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderAdoptionIRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAdoptionIRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
