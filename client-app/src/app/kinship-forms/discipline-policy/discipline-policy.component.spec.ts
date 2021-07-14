import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinePolicyComponent } from './discipline-policy.component';

describe('DisciplinePolicyComponent', () => {
  let component: DisciplinePolicyComponent;
  let fixture: ComponentFixture<DisciplinePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
