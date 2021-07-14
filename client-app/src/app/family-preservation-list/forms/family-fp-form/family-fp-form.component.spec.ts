import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyFpFormComponent } from './family-fp-form.component';

describe('FamilyFpFormComponent', () => {
  let component: FamilyFpFormComponent;
  let fixture: ComponentFixture<FamilyFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
