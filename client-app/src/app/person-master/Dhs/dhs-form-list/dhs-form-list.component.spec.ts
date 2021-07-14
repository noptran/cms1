import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhsFormListComponent } from './dhs-form-list.component';

describe('DhsFormListComponent', () => {
  let component: DhsFormListComponent;
  let fixture: ComponentFixture<DhsFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhsFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhsFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
