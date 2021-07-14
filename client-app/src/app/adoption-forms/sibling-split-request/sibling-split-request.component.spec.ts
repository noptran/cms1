import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiblingSplitRequestComponent } from './sibling-split-request.component';

describe('SiblingSplitRequestComponent', () => {
  let component: SiblingSplitRequestComponent;
  let fixture: ComponentFixture<SiblingSplitRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiblingSplitRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiblingSplitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
