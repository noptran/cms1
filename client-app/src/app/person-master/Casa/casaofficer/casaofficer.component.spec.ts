import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaofficerComponent } from './casaofficer.component';

describe('CasaofficerComponent', () => {
  let component: CasaofficerComponent;
  let fixture: ComponentFixture<CasaofficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasaofficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasaofficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
