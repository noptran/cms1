import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureChecklistComponent } from './departure-checklist.component';

describe('DepartureChecklistComponent', () => {
  let component: DepartureChecklistComponent;
  let fixture: ComponentFixture<DepartureChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartureChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
