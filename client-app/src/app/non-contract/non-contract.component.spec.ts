import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonContractComponent } from './non-contract.component';

describe('NonContractComponent', () => {
  let component: NonContractComponent;
  let fixture: ComponentFixture<NonContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
