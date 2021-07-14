import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonmasterListViewComponent } from './personmaster-list-view.component';

describe('PersonmasterListViewComponent', () => {
  let component: PersonmasterListViewComponent;
  let fixture: ComponentFixture<PersonmasterListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonmasterListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonmasterListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
