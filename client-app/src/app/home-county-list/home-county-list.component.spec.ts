import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCountyListComponent } from './home-county-list.component';

describe('HomeCountyListComponent', () => {
  let component: HomeCountyListComponent;
  let fixture: ComponentFixture<HomeCountyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCountyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCountyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
