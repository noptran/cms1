import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCountyFpFormComponent } from './home-county-fp-form.component';

describe('HomeCountyFpFormComponent', () => {
  let component: HomeCountyFpFormComponent;
  let fixture: ComponentFixture<HomeCountyFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCountyFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCountyFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
