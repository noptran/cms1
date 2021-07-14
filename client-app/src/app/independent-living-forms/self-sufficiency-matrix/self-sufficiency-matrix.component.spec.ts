import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfSufficiencyMatrixComponent } from './self-sufficiency-matrix.component';

describe('SelfSufficiencyMatrixComponent', () => {
  let component: SelfSufficiencyMatrixComponent;
  let fixture: ComponentFixture<SelfSufficiencyMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfSufficiencyMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfSufficiencyMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
