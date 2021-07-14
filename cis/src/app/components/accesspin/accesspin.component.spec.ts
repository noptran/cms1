import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesspinComponent } from './accesspin.component';

describe('AccesspinComponent', () => {
  let component: AccesspinComponent;
  let fixture: ComponentFixture<AccesspinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesspinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesspinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
