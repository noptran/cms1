import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventativeMeasureComponent } from './preventative-measure.component';

describe('PreventativeMeasureComponent', () => {
  let component: PreventativeMeasureComponent;
  let fixture: ComponentFixture<PreventativeMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventativeMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventativeMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
