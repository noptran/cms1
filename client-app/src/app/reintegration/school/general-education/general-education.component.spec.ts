import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEducationComponent } from './general-education.component';

describe('GeneralEducationComponent', () => {
  let component: GeneralEducationComponent;
  let fixture: ComponentFixture<GeneralEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
