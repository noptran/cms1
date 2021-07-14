import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMemberFormComponent } from './community-member-form.component';

describe('CommunityMemberFormComponent', () => {
  let component: CommunityMemberFormComponent;
  let fixture: ComponentFixture<CommunityMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
