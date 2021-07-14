import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManuelComponent } from './user-manuel.component';

describe('UserManuelComponent', () => {
  let component: UserManuelComponent;
  let fixture: ComponentFixture<UserManuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
