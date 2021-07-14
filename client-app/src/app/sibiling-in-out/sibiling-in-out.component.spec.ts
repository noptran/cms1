import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SibilingInOutComponent } from './sibiling-in-out.component';

describe('SibilingInOutComponent', () => {
  let component: SibilingInOutComponent;
  let fixture: ComponentFixture<SibilingInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SibilingInOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SibilingInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
