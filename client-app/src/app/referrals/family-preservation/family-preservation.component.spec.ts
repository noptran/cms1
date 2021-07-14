import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPreservationComponent } from './family-preservation.component';

describe('FamilyPreservationComponent', () => {
  let component: FamilyPreservationComponent;
  let fixture: ComponentFixture<FamilyPreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyPreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
