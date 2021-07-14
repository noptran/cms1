import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentTrainingComponent } from './recruitment-training.component';

describe('RecruitmentTrainingComponent', () => {
  let component: RecruitmentTrainingComponent;
  let fixture: ComponentFixture<RecruitmentTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
