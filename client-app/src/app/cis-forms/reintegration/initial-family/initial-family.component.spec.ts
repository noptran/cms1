import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialFamilyComponent } from './initial-family.component';

describe('InitialFamilyComponent', () => {
  let component: InitialFamilyComponent;
  let fixture: ComponentFixture<InitialFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
