import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultsComponent } from './adults.component';

describe('AdultsComponent', () => {
  let component: AdultsComponent;
  let fixture: ComponentFixture<AdultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
