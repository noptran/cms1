import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticViolenceScreeningComponent } from './domestic-violence-screening.component';

describe('DomesticViolenceScreeningComponent', () => {
  let component: DomesticViolenceScreeningComponent;
  let fixture: ComponentFixture<DomesticViolenceScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticViolenceScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticViolenceScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
