import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptiveVersioningComponent } from './adoptive-versioning.component';

describe('AdoptiveVersioningComponent', () => {
  let component: AdoptiveVersioningComponent;
  let fixture: ComponentFixture<AdoptiveVersioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptiveVersioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptiveVersioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
