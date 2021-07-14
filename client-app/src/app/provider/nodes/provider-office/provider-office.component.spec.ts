import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOfficeComponent } from './provider-office.component';

describe('ProviderOfficeComponent', () => {
  let component: ProviderOfficeComponent;
  let fixture: ComponentFixture<ProviderOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
