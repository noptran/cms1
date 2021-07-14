import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOpencardComponent } from './provider-opencard.component';

describe('ProviderOpencardComponent', () => {
  let component: ProviderOpencardComponent;
  let fixture: ComponentFixture<ProviderOpencardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderOpencardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOpencardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
