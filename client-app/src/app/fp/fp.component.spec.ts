import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FPComponent } from './fp.component';

describe('FPComponent', () => {
  let component: FPComponent;
  let fixture: ComponentFixture<FPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
