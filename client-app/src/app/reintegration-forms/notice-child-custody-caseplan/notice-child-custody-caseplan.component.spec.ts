import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeChildCustodyCaseplanComponent } from './notice-child-custody-caseplan.component';

describe('NoticeChildCustodyCaseplanComponent', () => {
  let component: NoticeChildCustodyCaseplanComponent;
  let fixture: ComponentFixture<NoticeChildCustodyCaseplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeChildCustodyCaseplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeChildCustodyCaseplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
