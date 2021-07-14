import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianFormListComponent } from './guardian-form-list.component';

describe('GuardianFormListComponent', () => {
  let component: GuardianFormListComponent;
  let fixture: ComponentFixture<GuardianFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardianFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
