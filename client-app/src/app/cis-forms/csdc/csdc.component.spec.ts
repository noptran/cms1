import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsdcComponent } from './csdc.component';

describe('CsdcComponent', () => {
  let component: CsdcComponent;
  let fixture: ComponentFixture<CsdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
