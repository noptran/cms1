import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolReleaseComponent } from './school-release.component';

describe('SchoolReleaseComponent', () => {
  let component: SchoolReleaseComponent;
  let fixture: ComponentFixture<SchoolReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
