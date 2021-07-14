import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KYACComponent } from './kyac.component';

describe('KYACComponent', () => {
  let component: KYACComponent;
  let fixture: ComponentFixture<KYACComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KYACComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KYACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
