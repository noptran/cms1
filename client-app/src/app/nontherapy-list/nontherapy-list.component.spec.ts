import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NontherapyListComponent } from './nontherapy-list.component';

describe('NontherapyListComponent', () => {
  let component: NontherapyListComponent;
  let fixture: ComponentFixture<NontherapyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NontherapyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NontherapyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
