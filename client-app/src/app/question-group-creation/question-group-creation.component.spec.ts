import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupCreationComponent } from './question-group-creation.component';

describe('QuestionGroupCreationComponent', () => {
  let component: QuestionGroupCreationComponent;
  let fixture: ComponentFixture<QuestionGroupCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
