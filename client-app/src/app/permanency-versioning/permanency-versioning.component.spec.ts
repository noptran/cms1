import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanencyVersioningComponent } from './permanency-versioning.component';

describe('PermanencyVersioningComponent', () => {
  let component: PermanencyVersioningComponent;
  let fixture: ComponentFixture<PermanencyVersioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanencyVersioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanencyVersioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
