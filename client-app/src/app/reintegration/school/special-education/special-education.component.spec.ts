import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEducationComponent } from './special-education.component';

describe('SpecialEducationComponent', () => {
  let component: SpecialEducationComponent;
  let fixture: ComponentFixture<SpecialEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
