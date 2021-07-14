import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusualIncidentComponent } from './unusual-incident.component';

describe('UnusualIncidentComponent', () => {
  let component: UnusualIncidentComponent;
  let fixture: ComponentFixture<UnusualIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnusualIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnusualIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
