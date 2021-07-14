import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRelapsePreventionNonIntensiveComponent } from './family-relapse-prevention-non-intensive.component';

describe('FamilyRelapsePreventionNonIntensiveComponent', () => {
  let component: FamilyRelapsePreventionNonIntensiveComponent;
  let fixture: ComponentFixture<FamilyRelapsePreventionNonIntensiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyRelapsePreventionNonIntensiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyRelapsePreventionNonIntensiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
