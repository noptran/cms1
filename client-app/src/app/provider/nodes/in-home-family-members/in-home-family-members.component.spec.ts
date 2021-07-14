import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InHomeFamilyMembersComponent } from './in-home-family-members.component';

describe('InHomeFamilyMembersComponent', () => {
  let component: InHomeFamilyMembersComponent;
  let fixture: ComponentFixture<InHomeFamilyMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InHomeFamilyMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InHomeFamilyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
