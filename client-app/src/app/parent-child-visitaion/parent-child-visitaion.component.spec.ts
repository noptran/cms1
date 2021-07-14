import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildVisitaionComponent } from './parent-child-visitaion.component';

describe('ParentChildVisitaionComponent', () => {
  let component: ParentChildVisitaionComponent;
  let fixture: ComponentFixture<ParentChildVisitaionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentChildVisitaionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentChildVisitaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
