import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialHistoryForChildrenComponent } from './social-history-for-children.component';

describe('SocialHistoryForChildrenComponent', () => {
  let component: SocialHistoryForChildrenComponent;
  let fixture: ComponentFixture<SocialHistoryForChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialHistoryForChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialHistoryForChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
