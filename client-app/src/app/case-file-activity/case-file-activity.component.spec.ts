import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileActivityComponent } from './case-file-activity.component';

describe('CaseFileActivityComponent', () => {
  let component: CaseFileActivityComponent;
  let fixture: ComponentFixture<CaseFileActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFileActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFileActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
