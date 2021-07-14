import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventativeMeasurementsListComponent } from './preventative-measurements-list.component';

describe('PreventativeMeasurementsListComponent', () => {
  let component: PreventativeMeasurementsListComponent;
  let fixture: ComponentFixture<PreventativeMeasurementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventativeMeasurementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventativeMeasurementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
