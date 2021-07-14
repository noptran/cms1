import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilMemberFormComponent } from './famil-member-form.component';

describe('FamilMemberFormComponent', () => {
  let component: FamilMemberFormComponent;
  let fixture: ComponentFixture<FamilMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
