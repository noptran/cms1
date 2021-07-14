import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAdoptionComponent } from './provider-adoption.component';

describe('ProviderAdoptionComponent', () => {
  let component: ProviderAdoptionComponent;
  let fixture: ComponentFixture<ProviderAdoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderAdoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
