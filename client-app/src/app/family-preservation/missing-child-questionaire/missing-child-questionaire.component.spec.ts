import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingChildQuestionaireComponent } from './missing-child-questionaire.component';

describe('MissingChildQuestionaireComponent', () => {
  let component: MissingChildQuestionaireComponent;
  let fixture: ComponentFixture<MissingChildQuestionaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingChildQuestionaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingChildQuestionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
