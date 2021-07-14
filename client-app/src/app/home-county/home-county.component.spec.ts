import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCountyComponent } from './home-county.component';

describe('HomeCountyComponent', () => {
  let component: HomeCountyComponent;
  let fixture: ComponentFixture<HomeCountyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCountyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
