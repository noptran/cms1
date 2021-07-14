import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdContactSheetComponent } from './dd-contact-sheet.component';

describe('DdContactSheetComponent', () => {
  let component: DdContactSheetComponent;
  let fixture: ComponentFixture<DdContactSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdContactSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdContactSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
