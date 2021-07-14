import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightFormComponent } from './user-right-form.component';

describe('UserRightFormComponent', () => {
  let component: UserRightFormComponent;
  let fixture: ComponentFixture<UserRightFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRightFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
