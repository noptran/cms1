import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KinshipAssessmentServiceComponent } from './kinship-assessment-service.component';

describe('KinshipAssessmentServiceComponent', () => {
  let component: KinshipAssessmentServiceComponent;
  let fixture: ComponentFixture<KinshipAssessmentServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KinshipAssessmentServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KinshipAssessmentServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
