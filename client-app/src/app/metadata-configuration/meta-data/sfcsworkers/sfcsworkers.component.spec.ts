import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcsworkersComponent } from './sfcsworkers.component';

describe('SfcsworkersComponent', () => {
  let component: SfcsworkersComponent;
  let fixture: ComponentFixture<SfcsworkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcsworkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcsworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
