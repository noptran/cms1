import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyChangeComponent } from './family-change.component';

describe('FamilyChangeComponent', () => {
  let component: FamilyChangeComponent;
  let fixture: ComponentFixture<FamilyChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
