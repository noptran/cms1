import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpecardsListViewComponent } from './opecards-list-view.component';

describe('OpecardsListViewComponent', () => {
  let component: OpecardsListViewComponent;
  let fixture: ComponentFixture<OpecardsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpecardsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpecardsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
