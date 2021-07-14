import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicallyFragileScoringToolComponent } from './medically-fragile-scoring-tool.component';

describe('MedicallyFragileScoringToolComponent', () => {
  let component: MedicallyFragileScoringToolComponent;
  let fixture: ComponentFixture<MedicallyFragileScoringToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicallyFragileScoringToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicallyFragileScoringToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
