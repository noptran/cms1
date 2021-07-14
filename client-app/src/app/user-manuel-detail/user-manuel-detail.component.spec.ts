import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManuelDetailComponent } from './user-manuel-detail.component';

describe('UserManuelDetailComponent', () => {
  let component: UserManuelDetailComponent;
  let fixture: ComponentFixture<UserManuelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManuelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManuelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
