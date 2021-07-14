import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionEventComponent } from './adoption-event.component';

describe('AdoptionEventComponent', () => {
  let component: AdoptionEventComponent;
  let fixture: ComponentFixture<AdoptionEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
